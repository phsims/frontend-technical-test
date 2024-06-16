
import { request } from './helpers';


const vehicleMediaSchema = {
  type: "object",
  properties: {
    name: { type: "string", description: "Name of image" },
    url: { type: "string", description: "URL of image" }
  },
  required: ["name", "url"]
};

const vehicleMetaSchema = {
  type: "object",
  properties: {
    passengers: { type: "number", description: "Number of passengers" },
    drivetrain: { type: "array", items: { type: "string" }, description: "Drivetrain" },
    bodystyles: { type: "array", items: { type: "string" }, description: "Bodystyles" },
    emissions: {
      type: "object",
      properties: {
        template: { type: "string", description: "Template" },
        value: { type: "number", description: "Value" }
      },
      required: ["template", "value"]
    }
  },
  required: ["passengers"]
};

const vehicleSummaryPayloadSchema = {
  type: "object",
  properties: {
    id: { type: "string", description: "ID of the vehicle" },
    apiUrl: { type: "string", description: "API URL for price, description & other details" },
    description: { type: "string", description: "Description" },
    price: { type: "string", description: "Price" },
    media: {
      type: "array",
      items: vehicleMediaSchema,
      description: "Array of vehicle images"
    },
    modelYear: { type: "string", description: "Model year" },
    meta: vehicleMetaSchema
  },
  required: ["id", "apiUrl", "price"]
};

// Utility function to validate an object against a schema
// I would prefer to use a TS or a library like Joi or Yup for validation, but I will use this simple utility function as the node veersion is so out of date
function validateObject(object, schema) {
  // Check if the object is missing any required properties
  for (const key of schema.required) {
    if (!object[key]) {
      console.error('Missing required property:', key);
      return false;
    }
    // check that price is not empty
    if (key === 'price' && object[key] === '') {
      console.error('Price is empty:', object);
      return false;
    }
  }
  
  return true
}


/**
 * Pull vehicles information
 *
 * @return {Promise<Array.<vehicleSummaryPayload>>}
 */
// TODO: All API related logic should be made inside this function.
export default async function getData() {
  try {
    const response = await request('/api/vehicles.json');
    // I would have prefered this to be a separate function
    const vehiclePromises = response.map(async vehicleInfo => {
      
      try {
        const vehicleDetails = await request(vehicleInfo.apiUrl);
        if (!vehicleDetails) {
          console.error('Invalid link:', vehicleInfo.id);
          return;
        }
        const vehicle = { ...vehicleDetails, ...vehicleInfo };
        if (!validateObject(vehicle, vehicleSummaryPayloadSchema)) {
          console.error('Invalid vehicleDetails structure:', vehicle);
          return;
        }
        
        return vehicle;
      } catch (error) {

        console.error('Error fetching vehicle details for ID:', vehicleInfo.id, error);
        return;
      }
    });

    const vehicles = (await Promise.all(vehiclePromises)).filter(v => v !== undefined);
    console.log('vehicles:', vehicles);
    return vehicles;
  } catch (error) {
    console.error('Error in getData:', error);
    throw error;
  }
}


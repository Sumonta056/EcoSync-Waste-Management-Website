import { Form, Input, Select, Button, message } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import { MdTransferWithinAStation } from "react-icons/md";
export default function STS() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
 /* const calculateFuelAllocationCostPerKm = (
    cUnloaded,
    cLoaded,
    capacity,
    wasteVolume
  ) => {
    try {
      // Convert capacity to a number by removing the "TON" suffix
      const numericCapacity = parseFloat(capacity.replace(" TON", ""));
      const numericCUnloaded = parseFloat(cUnloaded);
      const numericCLoaded = parseFloat(cLoaded);
      const numericWasteVolume = parseFloat(wasteVolume);

      // Calculate the fuel allocation cost per kilometer using the provided formula
      let perKmCost =
        numericCUnloaded +
        (numericWasteVolume / numericCapacity) *
          (numericCLoaded - numericCUnloaded);

      console.log("Per Km Cost:", perKmCost);

      return perKmCost;
    } catch (error) {
      console.error(
        "Error calculating fuel allocation cost per kilometer:",
        error.message
      );
      return null;
    }
  };
  */

  const onFinish = async (values) => {
    const successMessage = "Home collection entry added successfully";
    const errorMessage = "Failed to add home collection entry";

    try {
      setLoading(true);

      // Make your API call to the contract route endpoint here
      const { data } = await axios.post(
        "http://localhost:3000/homecollection", // Replace this with your contract route endpoint
        values
      );

      // Handle success response
      if (data.error) {
        throw new Error(data.error);
      }
      message.success(successMessage);
      form.resetFields();
    } catch (error) {
      message.error(error.message || errorMessage);
    } finally {
      setLoading(false);
    }
  };

      // Calculate the fuel allocation cost per kilometer
      /*const fuelAllocationCostPerKm = calculateFuelAllocationCostPerKm(
        selectedVehicle.unloadedfuelcost,
        selectedVehicle.loadedfuelcost,
        selectedVehicle.capacity,
        parseFloat(values.wastevolume) // Convert the waste volume to a floating-point number
      );*/

      //console.log("Fuel Allocation Cost Per Km:", fuelAllocationCostPerKm);

      
      
      //onsole.log(wardNumbers);
      // Calculate distance between STS and landfill
      /*const stsgpscoords = wardNumbers.find((sts) => sts._id == values.wardno);
      console.log("STS GPS Coordinates:", stsgpscoords.gpscoords);
      const landfillgpscoords = siteNumbers.find(
        (landfill) => landfill.id == values.siteno
      );
      console.log("Landfill GPS Coordinates:", landfillgpscoords.landfillGpsCoords);

      const distance = calculateDistance(
        stsgpscoords.gpscoords,
        landfillgpscoords.landfillGpsCoords
      );
      //console.log("Distance:", distance);

      // Add perKmCost and distance to updatedValues
      updatedValues.perkmcost = fuelAllocationCostPerKm;
      updatedValues.distance = distance;*/

 


  /*const calculateDistance = (stsCoords, landfillCoords) => {
    try {
      const [stsLat, stsLng] = stsCoords.split(",").map(parseFloat);
      const [landfillLat, landfillLng] = landfillCoords
        .split(",")
        .map(parseFloat);

      if (
        isNaN(stsLat) ||
        isNaN(stsLng) ||
        isNaN(landfillLat) ||
        isNaN(landfillLng)
      ) {
        throw new Error("Invalid coordinates provided");
      }

      const R = 6371; // Radius of the Earth in kilometers
      const dLat = deg2rad(landfillLat - stsLat);
      const dLng = deg2rad(landfillLng - stsLng);

      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(stsLat)) *
          Math.cos(deg2rad(landfillLat)) *
          Math.sin(dLng / 2) *
          Math.sin(dLng / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      let distance = R * c;

      if (isNaN(distance)) {
        throw new Error("Distance calculation resulted in NaN");
      }
      distance = Number(distance);
      // Convert distance to a string with two decimal points
      const formattedDistance = distance.toFixed(2);

      return formattedDistance;
    } catch (error) {
      console.error("Error calculating distance:", error.message);
      return null;
    }
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };*/

  const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
  return (
    <div className="w-[40rem] bg-white p-4 rounded-sm border border-gray-200">
      <strong className="flex justify-center w-full gap-2 pb-2 text-2xl text-center text-stone-700">
        <MdTransferWithinAStation size={30} /> Domestic Collection Plan
      </strong>
      <div className="flex flex-col gap-3 mt-4">
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item
            label="Area"
            name="area"
            rules={[{ required: true, message: "Please enter area" }]}
          >
            <Input placeholder="Enter Area" />
          </Form.Item>
          <Form.Item
          label="Start Time"
          name="starttime"
          rules={[
            { 
              required: true, 
              message: "Please enter start time" 
            },
            {
              pattern: /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
              message: 'Please enter a valid start time in the format HH:mm (00:00 - 23:59)',
            },
          ]}
        >
          <Input placeholder="Enter Start Time" />
        </Form.Item>

        <Form.Item
  label="Duration"
  name="duration"
  rules={[
    { 
      required: true, 
      message: "Please enter duration" 
    },
    {
      pattern: /^[0-9]+$/,
      message: 'Please enter valid duration',
    },
  ]}
>
  <Input placeholder="Enter Duration" />
</Form.Item>

          <Form.Item
            label="Number of Laborers"
            name="nooflaborers"
            rules={[
              { 
                required: true, 
                message: "Please enter number of laborers" 
              },
              {
                pattern: /^[0-9]+$/,
                message: 'Please enter valid number of laborers',
              },
            ]}
            >
            <Input placeholder="Enter Number of Laborers" />
          </Form.Item>
          <Form.Item
            label="Number of Vans"
            name="noofvans"
            rules={[
              { 
                required: true, 
                message: "Please enter number of vans" 
              },
              {
                pattern: /^[0-9]+$/,
                message: 'Please enter valid number of vans',
              },
            ]}
            >
            <Input placeholder="Enter Number of Vans" />
          </Form.Item>
          <Form.Item
            label="Expected Weight of Daily Solid Waste"
            name="expectedweight"
            rules={[
              { 
                required: true, 
                message: "Please enter expected weight of waste" 
              },
              {
                pattern: /^[0-9]+$/,
                message: 'Please enter valid weight',
              },
            ]}
            >
            <Input placeholder="Enter Expected Weight" />
          </Form.Item>
          {/* End of New Form Items */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
              style={{
                backgroundColor: "green",
                borderColor: "green",
                fontSize: "15px",
                height: "40px",
              }}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
  
}

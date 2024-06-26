import { Button, Label, TextInput } from "flowbite-react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import JsPDF from "jspdf";
import emailjs from "emailjs-com";
//import backgroundImage from "../image/bg.jpg";

export default function Booking() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    Date: "",
    Time: "",
    Discount: "0",
    Quantity: "1",
  });
  const [packageData, setPackageData] = useState({});
  const [TotalBill, setTotalBill] = useState(0);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const { data } = await axios.get(`/api/package?packageId=${id}`);
        setPackageData(data[0]);
        // Initial calculation of TotalBill should consider the default Quantity and Discount
        const initialTotalBill = calculateTotalBill(
          data[0].packagePrice,
          formData.Quantity,
          formData.Discount
        );
        setTotalBill(initialTotalBill);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPackages();
  }, [id]);

  useEffect(() => {
    // Calculate the total bill based on quantity and discount
    const updatedTotalBill = calculateTotalBill(
      packageData.packagePrice,
      formData.Quantity,
      formData.Discount
    );
    setTotalBill(updatedTotalBill);
  }, [formData, packageData]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const calculateTotalBill = (price, quantity, discount) => {
    const priceAfterDiscount = price * quantity * (1 - discount / 100);
    return priceAfterDiscount.toFixed(2); // Rounds to two decimal places
  };

  const sendEmailToSupplier = () => {
    const emailConfig = {
      serviceID: "service_p1zv9rh",
      templateID: "template_pua7ayd",
      userID: "v53cNBlrti0pL_RxD",
    };
    //email content
    const emailContent = `
      Dear Supplier,

      We have a new booking with the following details:
      
      Package Name: ${packageData.packageName}
      Price: Rs.${packageData.packagePrice}
      Item: ${packageData.packageDetails}
      Quantity: ${formData.Quantity}
      Date: ${formData.Date}
      Time: ${formData.Time}
      
      Discount: ${formData.Discount}%
      Total Bill: Rs.${TotalBill}
      
      Best regards,
      TourCraf
    `;

    emailjs
      .send(
        emailConfig.serviceID,
        emailConfig.templateID,
        {
          to_email: "mithunmh19@gmail.com",
          message: emailContent,
        },
        emailConfig.userID
      )
      .then((response) => {
        console.log("Email sent successfully!", response.status, response.text);
      })
      .catch((err) => {
        console.error("Failed to send email:", err);
      });
  };

  const generatePDF = () => {
    const pdf = new JsPDF();

    pdf.setFontSize(22);
    pdf.text("Booking Confirmation", 20, 20);

    pdf.setFontSize(16);
    pdf.text(`Package Name: ${packageData.packageName}`, 20, 40);
    pdf.text(`Price: $ ${packageData.packagePrice}`, 20, 50);
    pdf.text(`Item: ${packageData.packageDetails}`, 20, 60);
    pdf.text(`Quantity: ${formData.Quantity}`, 20, 70);
    pdf.text(`Date: ${formData.Date}`, 20, 80);
    pdf.text(`Time: ${formData.Time}`, 20, 90);

    pdf.text(`--------------------------------------`, 20, 100);

    pdf.text(`Discount: ${formData.Discount}%`, 20, 110);
    pdf.text(`Total Bill: $ ${TotalBill}`, 20, 120);

    pdf.save("booking-confirmation.pdf");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendEmailToSupplier();
    generatePDF();
  };

  return (
    <div
      style={{
        //backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`,
        backgroundSize: "cover",
        minHeight: "100vh",
      }}
    >
      <div className="p-3 max-w-3xl mx-auto min-h-screen">
        <form
          className="flex flex-col gap-4 bg-slate-500 mt-20 p-5"
          onSubmit={handleSubmit}
        >
          <h1 className="text-center text-3xl my-7 font-semibold">
            Package Booking
          </h1>

          <div className="flex flex-col gap-4 sm:flex-row justify-between mt-5">
            <Label value="Package Name" />
            <input
              type="text"
              required
              id="packageName"
              className="flex-1"
              value={packageData.packageName || ""}
              disabled
            />

            <Label value="Price" />
            <TextInput
              type="text"
              required
              id="packagePrice"
              className="flex-1"
              style={{ color: "black" }}
              value={"$ " + packageData.packagePrice}
              disabled
            />
          </div>

          <div className="flex flex-col gap-4 sm:flex-row justify-between mt-5">
            <Label value="Date" />
            <TextInput
              type="date"
              required
              id="Date"
              className="flex-1 black-text"
              style={{ color: "black" }}
              value={formData.Date}
              onChange={handleChange}
            />

            <Label value="Time" />
            <TextInput
              type="time"
              required
              id="Time"
              className="flex-1"
              style={{ color: "black" }}
              value={formData.Time}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-4 sm:flex-row justify-between mt-5">
            <Label value="Quantity" />
            <TextInput
              type="number"
              id="Quantity"
              min={1}
              style={{ color: "black" }}
              className="flex-1"
              value={formData.Quantity}
              onChange={handleChange}
            />
            <Label value="Discount" />
            <TextInput
              type="number"
              id="Discount"
              min={0}
              step={0.01}
              style={{ color: "black" }}
              className="flex-1"
              value={formData.Discount}
              onChange={handleChange}
            />
          </div>
          <Label value="Total Bill Amount" />
          <TextInput
            type="text"
            required
            id="totalBill"
            className="flex-1"
            style={{ color: "black" }}
            value={"$ " + TotalBill}
            disabled
          />

          <div className="flex justify-between">
            <div>
              <Link to="/res-pkg">
                <Button type="button" color="dark">
                  Back
                </Button>
              </Link>
            </div>
            <div>
              <Button type="submit" color="blue">
                Book
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

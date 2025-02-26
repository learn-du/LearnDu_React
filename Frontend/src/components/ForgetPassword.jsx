import faces from "../assets/faces.jpeg";
import template from "../assets/template.jpg";

export default function ResetPassword() {
  return (
    <div
      className="w-full h-screen bg-cover bg-center flex flex-col justify-center items-center relative px-4"
      style={{ backgroundImage: `url(${template})` }}
    >
      {/* Faces Section */}
      <div
        className="absolute top-0 w-full flex justify-center"
        style={{
          backgroundImage: `url(${faces})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center top",
          height: "140px",
          width: "100%",
        }}
      ></div>

      {/* Password Reset Form */}
      <div className="bg-white border border-black p-6 sm:p-8 w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-md xl:max-w-sm shadow-lg flex flex-col items-center justify-center mt-24 sm:mt-20 rounded-lg">
        <p className="text-center text-black text-sm sm:text-lg">
          Enter the email address you signed up with below. An email will be sent containing a link to reset your password.
        </p>

        <input
          type="email"
          placeholder="e.g john@gmail.com"
          className="w-full mt-4 p-2 border-b-4 border-black focus:outline-none"
          style={{
            backgroundColor: "#FEF9C3", // Light Yellow (equivalent to Tailwind bg-yellow-100)
            color: "#333",
          }}
        />

        <button className="w-full sm:w-40 mt-4 p-2 bg-[#FF6B6B] text-white rounded-md active:bg-red-400 transition duration-150">
          Send reset link
        </button>
      </div>
    </div>
  );
}
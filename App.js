import { useState, useEffect } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { FaLinkedin, FaEnvelope } from "react-icons/fa";

function App() {
  const [dark, setDark] = useState(() => {
    try {
      const stored = localStorage.getItem("theme");
      if (stored) return stored === "dark";
      return (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      );
    } catch (e) {
      return false;
    }
  });
  const [showModal, setShowModal] = useState(false);

  const [itemName, setItemName] = useState("");
  const [qty, setQty] = useState("");
  const [price, setPrice] = useState("");

  const gstRate = 18;

  const subtotal = qty * price || 0;
  const gstAmount = (subtotal * gstRate) / 100;
  const total = subtotal + gstAmount;

  
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      document.body.classList.add("dark");
      try {
        localStorage.setItem("theme", "dark");
      } catch (e) {}
    } else {
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("dark");
      try {
        localStorage.setItem("theme", "light");
      } catch (e) {}
    }
  }, [dark]);

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("GST Invoice", 105, 15, { align: "center" });

    autoTable(doc, {
      startY: 25,
      head: [["Item", "Qty", "Subtotal", "CGST", "SGST", "Total"]],
      body: [
        [
          itemName,
          qty,
          subtotal.toFixed(2),
          (gstAmount / 2).toFixed(2),
          (gstAmount / 2).toFixed(2),
          total.toFixed(2),
        ],
      ],
    });

    doc.save("GST_Invoice.pdf");
  };

  return (
    <div 
      className="min-h-screen transition-colors duration-300 px-6 md:px-16 lg:px-32 relative"
      style={{
        backgroundColor: dark ? '#000000' : '#ffffff',
        color: dark ? '#ffffff' : '#000000'
      }}
    >
     
      <div className="flex flex-col items-center pt-8">
        <img
          src="/images/profile_resume.jpg"
          className="rounded-lg w-40 h-40 object-cover shadow-lg border-4"
          style={{
            borderColor: dark ? '#4B5563' : '#D1D5DB'
          }}
          alt="profile"
          onError={(e) => {
            console.log("Image failed to load from /images/profile_resume.jpg");
           
            const fallback = document.createElement('div');
            fallback.className = 'w-40 h-40 rounded-lg shadow-lg border-4 flex items-center justify-center text-4xl font-bold';
            fallback.style.borderColor = dark ? '#4B5563' : '#D1D5DB';
            fallback.style.backgroundColor = dark ? '#374151' : '#F3F4F6';
            fallback.style.color = dark ? '#ffffff' : '#1F2937';
            fallback.textContent = 'VG';
            e.target.parentNode.replaceChild(fallback, e.target);
          }}
          onLoad={() => {
            console.log("Image loaded successfully!");
          }}
        />
      </div>

     
      <div className="max-w-3xl mx-auto mt-8">
      
        <div className="flex justify-start mb-4">
          <button
            onClick={() => {
              console.log("Current dark mode:", dark);
              setDark(!dark);
              console.log("Setting dark mode to:", !dark);
            }}
            className="w-10 h-10 rounded-full transition-all duration-300 border-2 shadow-lg hover:shadow-xl flex items-center justify-center text-sm"
            style={{
              backgroundColor: dark ? '#ffffff' : '#1f2937',
              color: dark ? '#000000' : '#ffffff',
              borderColor: dark ? '#ffffff' : '#1f2937'
            }}
          >
            {dark ? "☀️" : "🌙"}
          </button>
        </div>

        <h1 className="text-3xl font-bold text-left" style={{ color: dark ? '#ffffff' : '#000000' }}>Vandana Gupta</h1>
        
        <h2 className="font-semibold text-lg mt-6 text-left" style={{ color: dark ? '#ffffff' : '#000000' }}>About Me</h2>
        <p className="text-sm mt-2 text-left leading-relaxed" style={{ color: dark ? '#ffffff' : '#000000' }}>
          Hi, I am Vandana Gupta, A Frontend Developer passionate about building
          clean, responsive, and user-friendly web interfaces. Experienced with
          HTML, CSS, JavaScript, and modern UI practices, holding CCC and Python
          certifications. Led web initiatives as Web Dev Lead at PGDAV Placement
          Cell and as Project Head at Abhima Foundation. Currently focused on
          real-world frontend projects and seeking internships or entry-level
          opportunities to grow as a developer.
        </p>

        <h2 className="font-semibold text-lg mt-6 text-left" style={{ color: dark ? '#ffffff' : '#000000' }}>Interests</h2>
        <p className="text-sm mt-2 text-left" style={{ color: dark ? '#ffffff' : '#000000' }}>
          Writing Poems • Reading Books • Music • Movies • Travelling
        </p>

        {/* Social */}
        <div className="flex gap-6 mt-6">
          <FaLinkedin className="text-blue-600 dark:text-blue-400 text-2xl cursor-pointer hover:text-blue-800 dark:hover:text-blue-300 transition-colors" />
          <FaEnvelope className="text-blue-600 dark:text-red-400 text-2xl cursor-pointer hover:text-blue-800 dark:hover:text-red-300 transition-colors" />
        </div>

        {/* Project */}
        <div className="mt-12">
          <h2 className="font-bold text-xl text-left" style={{ color: dark ? '#ffffff' : '#000000' }}>GST Based Mini Project</h2>
          <p className="text-sm mt-3 text-left leading-relaxed" style={{ color: dark ? '#ffffff' : '#000000' }}>
            GST Calculator & Invoice Generator using React state management and
            dynamic calculations.
          </p>

          <button
            onClick={() => setShowModal(true)}
            className="mt-6 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-8 py-3 rounded-lg transition-colors duration-200 shadow-md font-medium"
          >
            Calculate GST & Invoice
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-6 rounded-lg shadow-xl w-full max-w-lg mx-4">
            <h2 className="font-bold mb-4 text-center text-xl">GST Calculator & Invoice</h2>

            <input
              placeholder="Item Name"
              value={itemName}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 mb-3 rounded-md text-gray-900 dark:text-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setItemName(e.target.value)}
            />
            <input
              placeholder="Quantity"
              type="number"
              value={qty}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 mb-3 rounded-md text-gray-900 dark:text-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setQty(e.target.value)}
            />
            <input
              placeholder="Price"
              type="number"
              value={price}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 mb-4 rounded-md text-gray-900 dark:text-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setPrice(e.target.value)}
            />

            <table className="w-full text-sm border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden">
              <thead className="bg-gray-200 dark:bg-gray-700">
                <tr>
                  <th className="p-2 border-r border-gray-300 dark:border-gray-600">Item</th>
                  <th className="p-2 border-r border-gray-300 dark:border-gray-600">Qty</th>
                  <th className="p-2">Total</th>
                </tr>
              </thead>
              <tbody className="bg-gray-50 dark:bg-gray-750">
                <tr>
                  <td className="p-2 border-r border-gray-300 dark:border-gray-600 text-center">{itemName || "-"}</td>
                  <td className="p-2 border-r border-gray-300 dark:border-gray-600 text-center">{qty || "-"}</td>
                  <td className="p-2 text-center">₹{total.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>

            <p className="font-semibold mt-4 text-center text-lg">
              Grand Total: ₹{total.toFixed(2)}
            </p>

            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={downloadPDF}
                className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white px-6 py-2 rounded-md transition-colors duration-200 shadow-md"
              >
                Download PDF
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-red-500 hover:bg-red-600 dark:bg-red-400 dark:hover:bg-red-500 text-white px-6 py-2 rounded-md transition-colors duration-200 shadow-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

document.addEventListener("DOMContentLoaded", function () {
    const ticketInfo = document.getElementById("ticket-info");
    const downloadBtn = document.getElementById("download-pdf");

    // ✅ Ensure jsPDF is available
    if (!window.jspdf || !window.jspdf.jsPDF) {
        console.error("Error: jsPDF is not loaded properly.");
        return;
    }

    const { jsPDF } = window.jspdf;

    // ✅ Get Booking Data from Local Storage
    const bookingData = JSON.parse(localStorage.getItem("bookingData"));

    if (bookingData) {
        ticketInfo.innerHTML = `
            <strong>Name:</strong> ${bookingData.name} <br>
            <strong>Phone:</strong> ${bookingData.phone} <br>
            <strong>Email:</strong> ${bookingData.email} <br>
            <strong>Event:</strong> ${bookingData.event} <br>
            <strong>Venue:</strong> ${bookingData.details.split("|")[0]} <br>
            <strong>Date & Time:</strong> ${bookingData.details.split("|")[1]} | ${bookingData.details.split("|")[2]} <br>
            <strong>Tickets:</strong> ${bookingData.tickets} <br>
            <strong>Category:</strong> ${bookingData.category} <br>
            <strong>Seats:</strong> ${bookingData.seats} <br>
        `;
    } else {
        ticketInfo.innerHTML = "<p>No ticket found.</p>";
    }

    // ✅ Download Ticket as PDF
    downloadBtn.addEventListener("click", function () {
        const doc = new jsPDF();

        // 🎨 **Professional Header**
        doc.setFillColor(0, 51, 102); // Dark Blue Header
        doc.rect(0, 0, 210, 30, "F"); // Full-width Header
        doc.setTextColor(255, 255, 255); // White Text
        doc.setFont("helvetica", "bold");
        doc.setFontSize(22);
        doc.text("BING MOMENTS", 70, 20);

        // ✅ Ticket Box
        doc.setDrawColor(0, 51, 102);
        doc.setLineWidth(1.5);
        doc.roundedRect(10, 40, 190, 100, 5, 5); // Rounded Box for Ticket Info

        // ✅ Ticket Details
        doc.setTextColor(0, 0, 0);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.text("Event Ticket", 90, 50);

        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        doc.text(`Name: ${bookingData.name}`, 20, 60);
        doc.text(`Phone: ${bookingData.phone}`, 20, 70);
        doc.text(`Email: ${bookingData.email}`, 20, 80);
        doc.text(`Event: ${bookingData.event}`, 20, 90);
        doc.text(`Venue: ${bookingData.details.split("|")[0]}`, 20, 100);
        doc.text(`Date & Time: ${bookingData.details.split("|")[1]} | ${bookingData.details.split("|")[2]}`, 20, 110);
        doc.text(`Tickets: ${bookingData.tickets}`, 20, 120);
        doc.text(`Category: ${bookingData.category}`, 20, 130);
        doc.text(`Seats: ${bookingData.seats}`, 20, 140);

        // 🎨 **Instruction Section**
        doc.setFillColor(240, 240, 240);
        doc.roundedRect(10, 160, 190, 50, 5, 5, "F"); // Gray Instruction Box
        doc.setTextColor(0, 51, 102);
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text("General Instructions", 75, 170);

        doc.setTextColor(0, 0, 0);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        doc.text("1. Arrive at least 30 minutes before the event.", 20, 180);
        doc.text("2. Bring a valid ID for verification.", 20, 190);
        doc.text("3. No outside food or drinks allowed.", 20, 200);
        doc.text("4. Follow the venue’s guidelines and instructions.", 20, 210);
        doc.text("5. Contact support for ticket-related queries.", 20, 220);

        // 📞 **Customer Support**
        doc.setFillColor(220, 220, 220); // Light Gray Footer
        doc.roundedRect(10, 240, 190, 20, 5, 5, "F"); // Footer Box
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(12);
        doc.text("For support, contact: support@bingmoments.com | +91 98765 43210", 30, 252);

        // ✅ Save PDF
        doc.save("event_ticket.pdf");
    });
});

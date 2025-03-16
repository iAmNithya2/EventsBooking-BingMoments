document.addEventListener("DOMContentLoaded", function () {
    const ticketInfo = document.getElementById("ticket-info");
    const downloadBtn = document.getElementById("download-pdf");

    if (!window.jspdf || !window.jspdf.jsPDF) {
        console.error("Error: jsPDF is not loaded properly.");
        return;
    }

    const { jsPDF } = window.jspdf;

    // Generate a Random Ticket ID
    function generateTicketID() {
        return 'TICKET-' + Math.floor(100000 + Math.random() * 900000);
    }

    let bookingData = JSON.parse(localStorage.getItem("bookingData"));

    if (bookingData) {
        if (!bookingData.ticketID) {
            bookingData.ticketID = generateTicketID();
            localStorage.setItem("bookingData", JSON.stringify(bookingData));
        }

        ticketInfo.innerHTML = `
            <strong>Ticket ID:</strong> ${bookingData.ticketID} <br>
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

    downloadBtn.addEventListener("click", function () {
        const doc = new jsPDF();

        doc.setFillColor(0, 51, 102);
        doc.rect(0, 0, 210, 30, "F");
        doc.setTextColor(255, 255, 255);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(22);
        doc.text("BING MOMENTS", 70, 20);

        doc.setDrawColor(0, 51, 102);
        doc.setLineWidth(1.5);
        doc.roundedRect(10, 40, 190, 110, 5, 5);

        doc.setTextColor(0, 0, 0);
        doc.setFontSize(14);
        doc.text("Event Ticket", 90, 50);

        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        doc.text(`Ticket ID: ${bookingData.ticketID}`, 20, 60);
        doc.text(`Name: ${bookingData.name}`, 20, 70);
        doc.text(`Phone: ${bookingData.phone}`, 20, 80);
        doc.text(`Email: ${bookingData.email}`, 20, 90);
        doc.text(`Event: ${bookingData.event}`, 20, 100);
        doc.text(`Venue: ${bookingData.details.split("|")[0]}`, 20, 110);
        doc.text(`Date & Time: ${bookingData.details.split("|")[1]} | ${bookingData.details.split("|")[2]}`, 20, 120);
        doc.text(`Tickets: ${bookingData.tickets}`, 20, 130);
        doc.text(`Category: ${bookingData.category}`, 20, 140);
        doc.text(`Seats: ${bookingData.seats}`, 20, 150);

        doc.setFillColor(240, 240, 240);
        doc.roundedRect(10, 170, 190, 50, 5, 5, "F");
        doc.setTextColor(0, 51, 102);
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text("General Instructions", 75, 180);

        doc.setTextColor(0, 0, 0);
        doc.setFontSize(12);
        doc.text("1. Arrive at least 30 minutes before the event.", 20, 190);
        doc.text("2. Bring a valid ID for verification.", 20, 200);
        doc.text("3. No outside food or drinks allowed.", 20, 210);
        doc.text("4. Follow the venue’s guidelines and instructions.", 20, 220);
        doc.text("5. Contact support for ticket-related queries.", 20, 230);

        doc.setFillColor(220, 220, 220);
        doc.roundedRect(10, 250, 190, 20, 5, 5, "F");
        doc.setTextColor(0, 0, 0);
        doc.text("For support, contact: support@bingmoments.com | +91 98765 43210", 30, 262);

        doc.save("event_ticket.pdf");
    });
});

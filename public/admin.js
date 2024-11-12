$(document).ready(function() {
    // Initialize JSGrid
    $("#jsGrid").jsGrid({
        height: "400px",
        width: "100%",
        editing: true,
        sorting: true,
        paging: true,
        data: [],
        fields: [
            { name: "title", type: "text", width: 150 },
            { name: "tamil", type: "text", width: 150 },
            { name: "year", type: "number", width: 100 },
            { name: "section", type: "text", width: 150 },
            { name: "pdflink", type: "text", width: 250 },
            { name: "audioUrl", type: "text", width: 250 },
            { type: "control", width: 100 }
        ]
    });

    // On checkbox change, enable/disable PDF link field
    $("#hasPdf").change(function() {
        if (this.checked) {
            $("#pdflink").prop("disabled", false);
        } else {
            $("#pdflink").prop("disabled", true).val("");
        }
    });

    // On form submit, generate links and send data to API
    $("#audioForm").submit(function(e) {
        e.preventDefault();

        const title = $("#title").val();
        const tamil = $("#tamil").val();
        const year = $("#year").val();
        const section = $("#section").val();
        const filename = $("#filename").val();
        const hasPdf = $("#hasPdf").prop("checked");
        const pdflink = hasPdf ? $("#pdflink").val() : `https://raw.githubusercontent.com/RajapriyaPradeep/${section}/main/${filename}.pdf`;
        const audioUrl = `https://raw.githubusercontent.com/RajapriyaPradeep/${section}/main/${filename}.mp3`;

        const newEntry = {
            title,
            tamil,
            year,
            section,
            pdflink,
            audioUrl
        };

        // Call API to add the new entry to audios.json
        $.ajax({
            url: '/api/add-entry',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(newEntry),
            success: function(response) {
                // Refresh JSGrid
                loadEntries();
            },
            error: function(error) {
                alert('Error saving the entry.');
            }
        });
    });

    // Load entries from audios.json
    function loadEntries() {
        $.get("/api/entries", function(data) {
            $("#jsGrid").jsGrid("option", "data", data);
        });
    }

    loadEntries();
});

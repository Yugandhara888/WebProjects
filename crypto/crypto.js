$(document).ready(function () {
    const API_URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr";

    let allCryptos = []; // To store all fetched cryptocurrency data

    // Function to fetch and display cryptocurrency data
    function fetchCryptos() {
        $.ajax({
            url: API_URL,
            type: "GET",
            success: function (data) {
                allCryptos = data; // Store fetched data
                displayCryptos(data); // Display all cryptocurrencies initially
            },
            error: function () {
                alert("Failed to fetch cryptocurrency data. Please try again.");
            },
        });
    }

    // Function to display cryptocurrency data
    function displayCryptos(data) {
        const cryptoList = $("#crypto-list");
        cryptoList.empty(); // Clear existing data

        if (data.length === 0) {
            cryptoList.append("<p class='text-center'>No cryptocurrencies found.</p>");
        } else {
            data.forEach((crypto) => {
                cryptoList.append(`
                    <div class="crypto-card d-flex align-items-center">
                        <img src="${crypto.image}" alt="${crypto.name}">
                        <div>
                            <h5>${crypto.name} (${crypto.symbol.toUpperCase()})</h5>
                            <p>Price: ₹${crypto.current_price.toLocaleString()}</p>
                        </div>
                    </div>
                `);
            });
        }
    }

    // Initial fetch
    fetchCryptos();

    // Refresh button click event
    $("#refresh").click(function () {
        fetchCryptos();
    });

    // Search functionality
    $("#search-crypto").on("input", function () {
        const searchQuery = $(this).val().toLowerCase();

        // Filter cryptos based on the search query
        const filteredCryptos = allCryptos.filter((crypto) =>
            crypto.name.toLowerCase().includes(searchQuery)
        );

        // Display only the filtered results
        displayCryptos(filteredCryptos);
    });
});

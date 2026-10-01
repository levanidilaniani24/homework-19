import { results } from "./data.js";

const deleteBtn = document.querySelector("#delete-btn");

deleteBtn.addEventListener("click", () => {
    deleteBtn.remove();
});

const image = document.createElement("img");

image.src = "https://fastly.picsum.photos/id/534/1000/800.jpg?hmac=tFbU1nZ2RnQNroI_ToBhH-LFB8KNjyWoc3bVv5G9Wkw";

image.alt = "Random image";
image.classList.add("random-image");

document.body.appendChild(image);

const flightList = document.querySelector("#flight-list");

const cardsHTML = results
    .map((result) => {

        const location = result.content.location.name;
        const imageUrl = result.content.image.url;
        const price = result.content.flightQuotes.cheapest.price;
        const direct = result.content.flightRoutes.directFlightsAvailable;

        return `
            <article class="flight-card">

                <img 
                    class="flight-image"
                    src="${imageUrl}"
                    alt="${location}"
                >

                <div class="flight-info">

                    <div class="country-row">
                        <h2>${location}</h2>

                        <span class="price">
                            ${price}
                        </span>
                    </div>

                    <div class="details">
                        <span class="flight-details">
                            Direct flight:
                            ${direct ? "Yes" : "No"}
                        </span>
                    </div>

                    <div class="buttons">

                        <button 
                            class="details-btn"
                            data-id="${result.id}"
                        >
                            See more details
                        </button>

                        <button 
                            class="remove-btn"
                            data-id="${result.id}"
                        >
                            Remove card
                        </button>

                    </div>

                </div>

            </article>
        `;
    })
    .join("");


flightList.innerHTML = cardsHTML;

const removeButtons = document.querySelectorAll(".remove-btn");

removeButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const card = button.closest(".flight-card");

        card.remove();

    });

});

const detailsButtons = document.querySelectorAll(".details-btn");

detailsButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const card = button.closest(".flight-card");

        const id = button.dataset.id;

        const result = results.find((item) => item.id === id);

        const direct =
            result.content.flightRoutes.directFlightsAvailable;

        const price =
            result.content.flightQuotes.cheapest.price;

        const details = card.querySelector(".details");

        details.innerHTML = `
            <p>
                <strong>Direct flight:</strong>
                ${direct ? "Yes" : "No"}
            </p>

            <p>
                <strong>Price:</strong>
                ${price}
            </p>
        `;

    });

});

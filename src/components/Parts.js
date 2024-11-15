import ItemCard from "../components/ItemCard"

import "./LoadingAnimation.css"

function Parts({ carParts }) {
    // Function to show a popup message when an item is added to the cart
    function showPopup(message) {
        const popup = document.createElement("div");
        popup.className = "popup";
        popup.textContent = message;
        document.body.appendChild(popup);

        setTimeout(() => {
            popup.classList.add("show");
        }, 10);

        setTimeout(() => {
            popup.classList.remove("show");
            setTimeout(() => document.body.removeChild(popup), 300);
        }, 2000);
    }

    // Function to add an item to the cart
    function toCart(name, image, price, id) {
        const cartItem = {
            id: id,
            name: name,
            image: image,
            price: price,
        };

        fetch(`https://json-server-template-gada.onrender.com/Cart`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(cartItem),
        }).then(() => showPopup("Item added to cart 🛒")); // Show popup on success

        
    }

    if (carParts.length === 0) {
        return (
          <div>
        
            <div className="loader">
          <div className="spinner"></div>
        </div>
          </div>
        );
      }

    return (
        <>
            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", textAlign: "center" }}>
                {carParts.map(carPart => (
                    <ItemCard
                        key={carPart.id}
                        name={carPart.name}
                        image={carPart.image}
                        price={carPart.price}
                        toCart={toCart}
                        id={carPart.id}
                    />
                ))}
            </div>
        </>
    );
}

export default Parts;

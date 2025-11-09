import React, { useEffect } from "react";
import { animate, scroll } from "motion";
import "../styles/gallery.css";

export default function GalleryScroll() {
  useEffect(() => {
    const items = document.querySelectorAll(".img-container");

    // Horizontal scroll animation
    scroll(
      animate(".img-group", {
        transform: ["none", `translateX(-${items.length - 1}00vw)`],
      }),
      { target: document.querySelector(".img-group-container") }
    );

    // Progress bar animation
    scroll(animate(".progress", { scaleX: [0, 1] }), {
      target: document.querySelector(".img-group-container"),
    });
  }, []);

  return (
    <article id="gallery">
      <header>
        <h2>Galeria GesCar</h2>
      </header>

      <section className="img-group-container">
        <div>
          <ul className="img-group">
            {["car1.jpg", "car2.jpg", "car3.jpg", "car4.jpg", "car5.jpg"].map(
              (img, i) => (
                <li key={i} className="img-container">
                  <img src={`/photos/${img}`} alt={`Carro ${i + 1}`} />
                  <h3>#{String(i + 1).padStart(3, "0")}</h3>
                </li>
              )
            )}
          </ul>
        </div>
      </section>

      <footer>
        <p>
          Fotos ilustrativas •{" "}
          <a
            target="_blank"
            href="https://www.freepik.com/free-photos/cars"
            rel="noreferrer"
          >
            Freepik Cars Collection
          </a>
        </p>
      </footer>

      <div className="progress"></div>
    </article>
  );
}

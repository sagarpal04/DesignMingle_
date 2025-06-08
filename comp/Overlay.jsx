"use client";
import CheckoutButton from "./CheckoutButton";
import { Logo } from "@pmndrs/branding";
import { motion, AnimatePresence } from "framer-motion";
import {
  AiFillCamera,
  AiOutlineArrowLeft,
  AiOutlineHighlight,
  AiOutlineShopping,
} from "react-icons/ai";
import { useSnapshot } from "valtio";
import { state } from "./store";
import { useState } from "react";

export function Overlay() {
  const snap = useSnapshot(state);
  const transition = { type: "spring", duration: 0.8 };
  const config = {
    initial: { x: -100, opacity: 0, transition: { ...transition, delay: 0.5 } },
    animate: { x: 0, opacity: 1, transition: { ...transition, delay: 0 } },
    exit: { x: -100, opacity: 0, transition: { ...transition, delay: 0 } },
  };
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      }}
    >
      <motion.header
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={transition}
      >
        <Logo width="40" height="40" />
        <motion.div
          animate={{ x: snap.intro ? 0 : 100, opacity: snap.intro ? 1 : 0 }}
          transition={transition}
        >
          <AiOutlineShopping size="3em" />
        </motion.div>
      </motion.header>
      <AnimatePresence>
        {snap.intro ? (
          <motion.section key="main" {...config}>
            <div className="section--container">
              <motion.div
                key="title"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                  type: "spring",
                  damping: 5,
                  stiffness: 40,
                  restDelta: 0.001,
                  duration: 0.3,
                }}
              >
                <h1>LET'S DO IT.</h1>
              </motion.div>
              <div className="support--content">
                <motion.div
                  key="p"
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    type: "spring",
                    damping: 7,
                    stiffness: 30,
                    restDelta: 0.001,
                    duration: 0.6,
                    delay: 0.2,
                    delayChildren: 0.2,
                  }}
                >
                  <p>
                    Create your unique and exclusive shirt with our brand-new 3D
                    customization tool.{" "}
                    <strong>Unleash your imagination</strong> and define your
                    own style.
                  </p>
                  <button
                    style={{ background: snap.color }}
                    onClick={() => (state.intro = false)}
                  >
                    CUSTOMIZE IT <AiOutlineHighlight size="1.3em" />
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.section>
        ) : (
          <motion.section key="custom" {...config}>
            <Customizer />
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}

function Customizer() {
  const snap = useSnapshot(state);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
  });
  const canvas = document.querySelector("canvas");
  const imageDataUrl = canvas ? canvas.toDataURL("image/png") : "";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here (e.g., send to backend)
    console.log("Form submitted:", formData);
    // Close modal after submission
    setShowModal(false);
  };
  const product = {
    id: "prod_123",
    name: "Customize Shirt",
    price: 1999, //
    name: formData.name,
    address: formData.address,
    email: formData.email,
    image: imageDataUrl, // <-- add product image here
  };
  return (
    <div className="customizer">
      <div className="color-options">
        {snap.colors.map((color) => (
          <div
            key={color}
            className={`circle`}
            style={{ background: color }}
            onClick={() => (state.color = color)}
          ></div>
        ))}
      </div>
      <div className="decals">
        <div className="decals--container">
          {snap.decals.map((decal) => (
            <div
              key={decal}
              className={`decal`}
              onClick={() => (state.decal = decal)}
            >
              <img src={decal + "_thumb.png"} alt="brand" />
            </div>
          ))}
        </div>
      </div>
      <button
        className="share"
        style={{ background: snap.color }}
        onClick={() => setShowModal(true)}
      >
        BUY NOW
        <AiOutlineShopping size="1.3em" />
      </button>
      <button
        className="exit"
        style={{ background: snap.color }}
        onClick={() => (state.intro = true)}
      >
        GO BACK
        <AiOutlineArrowLeft size="1.3em" />
      </button>

      {/* Modal Window */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0,0,0,0.5)",
              backdropFilter: "blur(4px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000,
              padding: "1rem",
            }}
          >
            <motion.div
              className="modal-content"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundColor: "#ffffff",
                padding: "2.5rem",
                borderRadius: "16px",
                maxWidth: "900px",
                width: "100%",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "2.5rem",
                boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                border: "1px solid rgba(255,255,255,0.2)",
                overflow: "hidden",
              }}
            >
              {/* Close button */}
              <button
                onClick={() => setShowModal(false)}
                style={{
                  position: "absolute",
                  top: "1rem",
                  right: "1rem",
                  background: "none",
                  border: "none",
                  fontSize: "1.5rem",
                  cursor: "pointer",
                  color: "#666",
                  zIndex: 10,
                }}
              >
                ×
              </button>

              {/* Image Section */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                  position: "relative",
                }}
              >
                <img
                  src={document.querySelector("canvas").toDataURL("image/png")}
                  alt="Custom Design"
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "cover",
                    transition: "transform 0.3s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.03)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: "1rem",
                    left: "1rem",
                    backgroundColor: "rgba(0,0,0,0.7)",
                    color: "white",
                    padding: "0.5rem 1rem",
                    borderRadius: "20px",
                    fontSize: "0.9rem",
                  }}
                >
                  Your Custom Design
                </div>
              </div>

              {/* Form Section */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <motion.h2
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  style={{
                    marginBottom: "1.5rem",
                    fontSize: "1.8rem",
                    fontWeight: "700",
                    color: "#333",
                    lineHeight: "1.3",
                  }}
                >
                  Complete Your{" "}
                  <span style={{ color: snap.color }}>Purchase</span>
                </motion.h2>

                <form onSubmit={handleSubmit}>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    style={{ marginBottom: "1.25rem" }}
                  >
                    <label
                      htmlFor="name"
                      style={{
                        display: "block",
                        marginBottom: "0.5rem",
                        fontSize: "0.9rem",
                        fontWeight: "500",
                        color: "#555",
                      }}
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: "100%",
                        padding: "0.75rem 1rem",
                        border: "1px solid #e0e0e0",
                        borderRadius: "8px",
                        fontSize: "0.95rem",
                        transition: "all 0.2s ease",
                        outline: "none",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = snap.color)}
                      onBlur={(e) => (e.target.style.borderColor = "#e0e0e0")}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.25 }}
                    style={{ marginBottom: "1.25rem" }}
                  >
                    <label
                      htmlFor="address"
                      style={{
                        display: "block",
                        marginBottom: "0.5rem",
                        fontSize: "0.9rem",
                        fontWeight: "500",
                        color: "#555",
                      }}
                    >
                      Delivery Address
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: "100%",
                        padding: "0.75rem 1rem",
                        border: "1px solid #e0e0e0",
                        borderRadius: "8px",
                        fontSize: "0.95rem",
                        minHeight: "80px",
                        resize: "vertical",
                        transition: "all 0.2s ease",
                        outline: "none",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = snap.color)}
                      onBlur={(e) => (e.target.style.borderColor = "#e0e0e0")}
                    />
                  </motion.div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr",
                      gap: "1rem",
                    }}
                  >
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      style={{ marginBottom: "1.25rem" }}
                    >
                      <label
                        htmlFor="email"
                        style={{
                          display: "block",
                          marginBottom: "0.5rem",
                          fontSize: "0.9rem",
                          fontWeight: "500",
                          color: "#555",
                        }}
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        style={{
                          width: "100%",
                          padding: "0.75rem 1rem",
                          border: "1px solid #e0e0e0",
                          borderRadius: "8px",
                          fontSize: "0.95rem",
                          transition: "all 0.2s ease",
                          outline: "none",
                        }}
                        onFocus={(e) =>
                          (e.target.style.borderColor = snap.color)
                        }
                        onBlur={(e) => (e.target.style.borderColor = "#e0e0e0")}
                      />
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    style={{
                      marginTop: "1.5rem",
                      paddingTop: "1.5rem",
                      borderTop: "1px dashed #e0e0e0",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "1rem",
                      }}
                    >
                      <span style={{ color: "#666" }}>Total</span>
                      <span style={{ fontWeight: "600", fontSize: "1.2rem" }}>
                        ₹1999
                      </span>
                    </div>
                    <CheckoutButton product={product} />
                  </motion.div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

import React from "react";
import "react-slideshow-image/dist/styles.css";
import { Slide } from "react-slideshow-image";
import {
 
  Typography,
} from "@mui/material";
import { HashLink } from "react-router-hash-link";


const slideImages = [
  {
    url: "https://res.cloudinary.com/dd7lihgvm/image/upload/v1683294543/Thakur%20Hospital%20Gallery/new_yxbemw.jpg",
    title: "WEIGHT",
  },
  {
    url: "https://res.cloudinary.com/dd7lihgvm/image/upload/v1683531552/image14_qajf9y_1_vbu2n1.jpg",
    title: "WEIGHT",
  },
  {
    url: "https://res.cloudinary.com/dd7lihgvm/image/upload/v1683027029/Thakur%20Hospital%20Gallery/image13_b6lzpf.jpg",
    title: "HEIGHT",
  },
  {
    url: "https://res.cloudinary.com/dd7lihgvm/image/upload/v1683027028/Thakur%20Hospital%20Gallery/image7_yvzl8y.jpg",
    title: "PHYSICAL EXAMINATION",
  },
  {
    url: "https://res.cloudinary.com/dd7lihgvm/image/upload/v1683027028/Thakur%20Hospital%20Gallery/image6_nfxho2.jpg",
    title: "PHYSICAL EXAMINATION",
  },
  {
    url: "https://res.cloudinary.com/dd7lihgvm/image/upload/v1683445238/WhatsApp_Image_2023-05-05_at_1.57.51_PM_b8igff.jpg",
    title: "PHYSICAL EXAMINATION",
  },
  // {
  //   url: "https://res.cloudinary.com/dd7lihgvm/image/upload/v1683445348/WhatsApp_Image_2023-05-05_at_1.57.52_PM_zlzlvm.jpg",
  //   title: "PHYSICAL EXAMINATION",
  // },
  // {
  //   url: "https://res.cloudinary.com/dd7lihgvm/image/upload/v1683027032/Thakur%20Hospital%20Gallery/image40_ivfafg.jpg",
  //   title: `LAB SAMPLE & TESTING (In company premises)`,
  // },
  // {
  //   url: "https://res.cloudinary.com/dd7lihgvm/image/upload/v1683027032/Thakur%20Hospital%20Gallery/image37_mxmza4.jpg",
  //   title: "LAB SAMPLE & TESTING (In company premises)",
  // },
  // {
  //   url: "https://res.cloudinary.com/dd7lihgvm/image/upload/v1683027032/Thakur%20Hospital%20Gallery/image38_ey89ad.jpg",
  //   title: "LAB SAMPLE & TESTING (In company premises)",
  // },
  {
    url: "https://res.cloudinary.com/dd7lihgvm/image/upload/v1683027028/Thakur%20Hospital%20Gallery/image9_d4lidv.jpg",
    title: "LAB SAMPLE & TESTING (In company premises)",
  },
  {
    url: "https://res.cloudinary.com/dd7lihgvm/image/upload/v1683445808/WhatsApp_Image_2023-05-05_at_1.57.53_PM_tmksej.jpg",
    title: "LAB SAMPLE & TESTING (In company premises)",
  },
  {
    url: "https://res.cloudinary.com/dd7lihgvm/image/upload/v1683027028/Thakur%20Hospital%20Gallery/image8_ngkj23.jpg",
    title: "LAB SAMPLE & TESTING (In company premises)",
  },

  {
    url: "https://res.cloudinary.com/dd7lihgvm/image/upload/v1683027030/Thakur%20Hospital%20Gallery/image20_mpyx2l.jpg",
    title: "SPIROMETRY TEST",
  },
  {
    url: "https://res.cloudinary.com/dd7lihgvm/image/upload/v1683027030/Thakur%20Hospital%20Gallery/image20_mpyx2l.jpg",
    title: "SPIROMETRY TEST",
  },
  {
    url: "https://res.cloudinary.com/dd7lihgvm/image/upload/v1683027030/Thakur%20Hospital%20Gallery/image22_hzhm71.jpg",
    title: "SPIROMETRY TEST",
  },
  {
    url: "https://res.cloudinary.com/dd7lihgvm/image/upload/v1683027033/Thakur%20Hospital%20Gallery/image49_tyssnd.jpg",
    title: "AUDIOMETRY TEST",
  },
  {
    url: "https://res.cloudinary.com/dd7lihgvm/image/upload/v1683027032/Thakur%20Hospital%20Gallery/image35_jlb3ar.jpg",
    title: "AUDIOMETRY TEST",
  },
  {
    url: "https://res.cloudinary.com/dd7lihgvm/image/upload/v1683027031/Thakur%20Hospital%20Gallery/image36_kiojlx.jpg",
    title: "AUDIOMETRY TEST",
  },
  {
    url: "https://res.cloudinary.com/dd7lihgvm/image/upload/v1683027033/Thakur%20Hospital%20Gallery/image46_leszds.jpg",
    title: "MEDICAL HALL",
  },
  {
    url: "https://res.cloudinary.com/dd7lihgvm/image/upload/v1683027033/Thakur%20Hospital%20Gallery/image47_pnwhyk.jpg",
    title: "MEDICAL HALL",
  },
  {
    url: "https://res.cloudinary.com/dd7lihgvm/image/upload/v1683027033/Thakur%20Hospital%20Gallery/image44_tujnei.jpg",
    title: "MEDICAL HALL",
  },
  {
    url: "https://res.cloudinary.com/dd7lihgvm/image/upload/v1683027032/Thakur%20Hospital%20Gallery/image45_plbp5w.jpg",
    title: "MEDICAL HALL",
  },
  {
    url: "https://res.cloudinary.com/dd7lihgvm/image/upload/v1683027032/Thakur%20Hospital%20Gallery/image41_zrkskr.jpg",
    title: "X-RAY",
  },
  {
    url: "https://res.cloudinary.com/dd7lihgvm/image/upload/v1683027032/Thakur%20Hospital%20Gallery/image42_jf0quz.jpg",
    title: "X-RAY",
  },
  {
    url: "https://res.cloudinary.com/dd7lihgvm/image/upload/v1683027031/Thakur%20Hospital%20Gallery/image34_wswq4a.jpg",
    title: "X-RAY",
  },
  {
    url: "https://res.cloudinary.com/dd7lihgvm/image/upload/v1683027028/Thakur%20Hospital%20Gallery/image11_bymb6k.jpg",
    title: "X-RAY",
  },

  // {
  //   url: "https://res.cloudinary.com/dd7lihgvm/image/upload/v1683027031/Thakur%20Hospital%20Gallery/image31_cyney6.jpg",
  //   title:"WARD"
  // },
  {
    url: "https://res.cloudinary.com/dd7lihgvm/image/upload/v1683027028/Thakur%20Hospital%20Gallery/image4_rhl7pn.jpg",
    title: "ECG",
  },
  {
    url: "https://res.cloudinary.com/dd7lihgvm/image/upload/v1683027027/Thakur%20Hospital%20Gallery/image2_c60n06.jpg",
    title: "ECG",
  },
  {
    url: "https://res.cloudinary.com/dd7lihgvm/image/upload/v1683027027/Thakur%20Hospital%20Gallery/image1_irnvsf.jpg",
    title: "ECG",
  },
  {
    url: "https://res.cloudinary.com/dd7lihgvm/image/upload/v1683027027/Thakur%20Hospital%20Gallery/image5_nddxpb.jpg",
    title: "ECG",
  },
  {
    url: "https://res.cloudinary.com/dd7lihgvm/image/upload/v1683027031/Thakur%20Hospital%20Gallery/image30_frikxp.jpg",
    title: "EMERGENCY WARD",
  },
  {
    url: "https://res.cloudinary.com/dd7lihgvm/image/upload/v1683027030/Thakur%20Hospital%20Gallery/image29_qaqvw8.jpg",
    title: "EMERGENCY WARD",
  },
  {
    url: "https://res.cloudinary.com/dd7lihgvm/image/upload/v1683027030/Thakur%20Hospital%20Gallery/image26_lb8htv.jpg",
    title: "EMERGENCY WARD",
  },
  {
    url: "https://res.cloudinary.com/dd7lihgvm/image/upload/v1683027030/Thakur%20Hospital%20Gallery/image25_ykkheq.jpg",
    title: "EMERGENCY WARD",
  },
  {
    url: "https://res.cloudinary.com/dd7lihgvm/image/upload/v1683027029/Thakur%20Hospital%20Gallery/image17_fvzit4.jpg",
    title: "EMERGENCY WARD",
  },
  // {
  //   url: "https://res.cloudinary.com/dd7lihgvm/image/upload/v1683027031/Thakur%20Hospital%20Gallery/image32_ilbnbz.jpg",
  //   title: "RECEPTION",
  // },
  // {
  //   url: "https://res.cloudinary.com/dd7lihgvm/image/upload/v1683027030/Thakur%20Hospital%20Gallery/image19_q7izpm.jpg",
  //   title: "RECEPTION",
  // },
];
const divStyle = {
  display: "flex",
//   alignItems: "center",
  justifyContent: "center",
  height: "600px",
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundColor: "rgb(125, 181, 215)",
};
const spanStyle = {
  fontSize: "10px",
  background: "#grey",
  color: "black",
};
function Slideshow() {
  return (
    <div className="slide-container">
      <Typography
        sx={{ mt: 2, mb: 2, fontWeight: 600 }}
        style={{ color: "rgb(1,64,118)", textAlign: "center" }}
        variant="h6"
      >
        Facility Gallery
      </Typography>
      <Slide autoplay={true} duration={3000}>
        {slideImages.map((image, index) => (
          <div key={index}>
            <div style={{ ...divStyle,backgroundImage: `url(${image.url})` }}>
              <span style={spanStyle}>{image.caption}</span>
            </div>
          </div>
        ))}
      </Slide>
      <Typography sx={{ mx: 2, p: 2, textAlign: "end", fontWeight: 600 }}>
        <HashLink
          smooth
          to="/gallery"
          className="text-style"
          style={{ color: "rgb(1,64,118)" }}
          color="primary"
        >
          {" "}
          View Gallery{" "}
        </HashLink>
      </Typography>
    </div>
  );
}

export default Slideshow;

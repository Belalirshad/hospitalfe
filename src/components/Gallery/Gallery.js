import * as React from "react";
// import ImageList from "@mui/material/ImageList";
import { useEffect, useRef } from "react";
// import ImageListItem from "@mui/material/ImageListItem";
import { Typography } from "@mui/material";
import SimpleReactLightbox, { SRLWrapper } from "simple-react-lightbox";
import "./Gallery.css";

// export default function ImagesList() {
//   return (
//     <SimpleReactLightbox>
//       <SRLWrapper>
//         <div
//           style={{
//             // height: "100vh",
//             // width: "100%",
//             display: "flex",
//             justifyContent: "space-between",
//             // alignItems: "center",
//             backgroundColor: "rgb(125, 181, 215)"
//           }}
//         >
//           <ImageList
//             sx={{
//               bgcolor: "rgb(125, 181, 215)",
//               width: 1,
//               height: 0.85,
//               //   mt: 40,
//               //   mb: 30,
//               m: 0.5,
//             }}
//             cols={4}
//             rowHeight={470}
//           >
//             {itemData.map((item, index) => (
//               <ImageListItem key={index}>
//                 <img
//                   src={`${item.img}?fit=crop&auto=format`}
//                   srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
//                   alt={item.title}
//                   loading="lazy"
//                 />
//               </ImageListItem>
//             ))}
//           </ImageList>
//         </div>
//       </SRLWrapper>
//     </SimpleReactLightbox>
//   );
// }

import { Card, CardContent, CardMedia, Grid } from "@mui/material";

export default function ImageCards() {
  const topRef = useRef(null);

  useEffect(() => {
    topRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  const images = [
    {
      img: "https://res.cloudinary.com/dd7lihgvm/image/upload/v1683294543/Thakur%20Hospital%20Gallery/new_yxbemw.jpg",
      title: "WEIGHT",
    },
    {
      img: "https://res.cloudinary.com/dd7lihgvm/image/upload/v1683531552/image14_qajf9y_1_vbu2n1.jpg",
      title: "WEIGHT",
    },
    {
      img: "https://res.cloudinary.com/dd7lihgvm/image/upload/v1683027029/Thakur%20Hospital%20Gallery/image13_b6lzpf.jpg",
      title: "HEIGHT",
    },
    {
      img: "https://res.cloudinary.com/dd7lihgvm/image/upload/v1683027028/Thakur%20Hospital%20Gallery/image7_yvzl8y.jpg",
      title: "PHYSICAL EXAMINATION",
    },
    {
      img: "https://res.cloudinary.com/dd7lihgvm/image/upload/v1683027028/Thakur%20Hospital%20Gallery/image6_nfxho2.jpg",
      title: "PHYSICAL EXAMINATION",
    },
    {
      img: "https://res.cloudinary.com/dd7lihgvm/image/upload/v1683445238/WhatsApp_Image_2023-05-05_at_1.57.51_PM_b8igff.jpg",
      title: "PHYSICAL EXAMINATION",
    },
    // {
    //   img: "https://res.cloudinary.com/dd7lihgvm/image/upload/v1683445348/WhatsApp_Image_2023-05-05_at_1.57.52_PM_zlzlvm.jpg",
    //   title: "PHYSICAL EXAMINATION",
    // },
    {
      img: "https://res.cloudinary.com/dd7lihgvm/image/upload/v1683027032/Thakur%20Hospital%20Gallery/image40_ivfafg.jpg",
      title: `LAB SAMPLE & TESTING (In company premises)`,
    },
    {
      img: "https://res.cloudinary.com/dd7lihgvm/image/upload/v1683027032/Thakur%20Hospital%20Gallery/image37_mxmza4.jpg",
      title: "LAB SAMPLE & TESTING (In company premises)",
    },
    {
      img: "https://res.cloudinary.com/dd7lihgvm/image/upload/v1683027032/Thakur%20Hospital%20Gallery/image38_ey89ad.jpg",
      title: "LAB SAMPLE & TESTING (In company premises)",
    },
    {
      img: "https://res.cloudinary.com/dd7lihgvm/image/upload/v1683027028/Thakur%20Hospital%20Gallery/image9_d4lidv.jpg",
      title: "LAB SAMPLE & TESTING (In company premises)",
    },
    {
      img: "https://res.cloudinary.com/dd7lihgvm/image/upload/v1683445808/WhatsApp_Image_2023-05-05_at_1.57.53_PM_tmksej.jpg",
      title: "LAB SAMPLE & TESTING (In company premises)",
    },
    {
      img: "https://res.cloudinary.com/dd7lihgvm/image/upload/v1683027028/Thakur%20Hospital%20Gallery/image8_ngkj23.jpg",
      title: "LAB SAMPLE & TESTING (In company premises)",
    },

    {
      img: "https://res.cloudinary.com/dd7lihgvm/image/upload/v1683027030/Thakur%20Hospital%20Gallery/image20_mpyx2l.jpg",
      title: "SPIROMETRY TEST",
    },
    {
      img: "https://res.cloudinary.com/dd7lihgvm/image/upload/v1683027030/Thakur%20Hospital%20Gallery/image20_mpyx2l.jpg",
      title: "SPIROMETRY TEST",
    },
    {
      img: "https://res.cloudinary.com/dd7lihgvm/image/upload/v1683027030/Thakur%20Hospital%20Gallery/image22_hzhm71.jpg",
      title: "SPIROMETRY TEST",
    },
    {
      img: "https://res.cloudinary.com/dd7lihgvm/image/upload/v1683027033/Thakur%20Hospital%20Gallery/image49_tyssnd.jpg",
      title: "AUDIOMETRY TEST",
    },
    {
      img: "https://res.cloudinary.com/dd7lihgvm/image/upload/v1683027032/Thakur%20Hospital%20Gallery/image35_jlb3ar.jpg",
      title: "AUDIOMETRY TEST",
    },
    {
      img: "https://res.cloudinary.com/dd7lihgvm/image/upload/v1683027031/Thakur%20Hospital%20Gallery/image36_kiojlx.jpg",
      title: "AUDIOMETRY TEST",
    },
    {
      img: "https://res.cloudinary.com/dd7lihgvm/image/upload/v1683027033/Thakur%20Hospital%20Gallery/image46_leszds.jpg",
      title: "MEDICAL HALL",
    },
    {
      img: "https://res.cloudinary.com/dd7lihgvm/image/upload/v1683027033/Thakur%20Hospital%20Gallery/image47_pnwhyk.jpg",
      title: "MEDICAL HALL",
    },
    {
      img: "https://res.cloudinary.com/dd7lihgvm/image/upload/v1683027033/Thakur%20Hospital%20Gallery/image44_tujnei.jpg",
      title: "MEDICAL HALL",
    },
    {
      img: "https://res.cloudinary.com/dd7lihgvm/image/upload/v1683027032/Thakur%20Hospital%20Gallery/image45_plbp5w.jpg",
      title: "MEDICAL HALL",
    },
    {
      img: "https://res.cloudinary.com/dd7lihgvm/image/upload/v1683027032/Thakur%20Hospital%20Gallery/image41_zrkskr.jpg",
      title: "X-RAY",
    },
    {
      img: "https://res.cloudinary.com/dd7lihgvm/image/upload/v1683027032/Thakur%20Hospital%20Gallery/image42_jf0quz.jpg",
      title: "X-RAY",
    },
    {
      img: "https://res.cloudinary.com/dd7lihgvm/image/upload/v1683027031/Thakur%20Hospital%20Gallery/image34_wswq4a.jpg",
      title: "X-RAY",
    },
    {
      img: "https://res.cloudinary.com/dd7lihgvm/image/upload/v1683027028/Thakur%20Hospital%20Gallery/image11_bymb6k.jpg",
      title: "X-RAY",
    },

    // {
    //   img: "https://res.cloudinary.com/dd7lihgvm/image/upload/v1683027031/Thakur%20Hospital%20Gallery/image31_cyney6.jpg",
    //   title:"WARD"
    // },
    {
      img: "https://res.cloudinary.com/dd7lihgvm/image/upload/v1683027028/Thakur%20Hospital%20Gallery/image4_rhl7pn.jpg",
      title: "ECG",
    },
    {
      img: "https://res.cloudinary.com/dd7lihgvm/image/upload/v1683027027/Thakur%20Hospital%20Gallery/image2_c60n06.jpg",
      title: "ECG",
    },
    {
      img: "https://res.cloudinary.com/dd7lihgvm/image/upload/v1683027027/Thakur%20Hospital%20Gallery/image1_irnvsf.jpg",
      title: "ECG",
    },
    {
      img: "https://res.cloudinary.com/dd7lihgvm/image/upload/v1683027027/Thakur%20Hospital%20Gallery/image5_nddxpb.jpg",
      title: "ECG",
    },
    {
      img: "https://res.cloudinary.com/dd7lihgvm/image/upload/v1683027031/Thakur%20Hospital%20Gallery/image30_frikxp.jpg",
      title: "EMERGENCY WARD",
    },
    {
      img: "https://res.cloudinary.com/dd7lihgvm/image/upload/v1683027030/Thakur%20Hospital%20Gallery/image29_qaqvw8.jpg",
      title: "EMERGENCY WARD",
    },
    {
      img: "https://res.cloudinary.com/dd7lihgvm/image/upload/v1683027030/Thakur%20Hospital%20Gallery/image26_lb8htv.jpg",
      title: "EMERGENCY WARD",
    },
    {
      img: "https://res.cloudinary.com/dd7lihgvm/image/upload/v1683027030/Thakur%20Hospital%20Gallery/image25_ykkheq.jpg",
      title: "EMERGENCY WARD",
    },
    {
      img: "https://res.cloudinary.com/dd7lihgvm/image/upload/v1683027029/Thakur%20Hospital%20Gallery/image17_fvzit4.jpg",
      title: "EMERGENCY WARD",
    },
    {
      img: "https://res.cloudinary.com/dd7lihgvm/image/upload/v1683027031/Thakur%20Hospital%20Gallery/image32_ilbnbz.jpg",
      title: "RECEPTION",
    },
    {
      img: "https://res.cloudinary.com/dd7lihgvm/image/upload/v1683027030/Thakur%20Hospital%20Gallery/image19_q7izpm.jpg",
      title: "RECEPTION",
    },
  ];

  return (
    <div ref={topRef}>
      <SimpleReactLightbox>
        <SRLWrapper>
          <Grid
            container
            spacing={2}
            style={{
              paddingTop: "130px",
              paddingBottom: "90px",
              paddingLeft: "20px",
              backgroundColor: "rgb(125, 181, 215)",
            }}
          >
            {images.map((image, index) => (
              <Grid
                item
                xs={11}
                md={2}
                key={index}
                style={{ marginBottom: "15px", backgroundSize:'contain'}}
              >
                <Card
                  className="Card"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    flexWrap: "nowrap",
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.15)",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="300px"
                    image={image.img}
                    alt={image.title}
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="div"
                      style={{ color: "rgb(1,64,118)", textAlign: "center" }}
                    >
                      {image.title}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </SRLWrapper>
      </SimpleReactLightbox>
    </div>
  );
}

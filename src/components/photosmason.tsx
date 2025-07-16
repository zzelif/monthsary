import Masonry from "@/components/ui/masonry";

const items = [
  {
    id: "1",

    img: "/photos/photo_6321301659476675222_w.jpg",

    url: "",

    height: 450,
  },

  {
    id: "2",

    img: "/photos/photo_6321301659476675215_w.jpg",

    url: "",

    height: 250,
  },

  {
    id: "3",

    img: "/photos/photo_6321301659476675158_w.jpg",

    url: "",

    height: 550,
  },

  {
    id: "4",

    img: "/photos/photo_6321301659476675184_y.jpg",

    url: "",

    height: 450,
  },
  {
    id: "5",

    img: "/photos/photo_6321301659476675182_w.jpg",

    url: "",

    height: 300,
  },
  {
    id: "6",

    img: "/photos/photo_6321301659476675163_w.jpg",

    url: "",

    height: 400,
  },

  {
    id: "7",

    img: "/photos/photo_6321301659476675169_w.jpg",

    url: "",

    height: 350,
  },

  {
    id: "8",

    img: "/photos/photo_6321301659476675156_w.jpg",

    url: "",

    height: 400,
  },

  {
    id: "9",

    img: "/photos/photo_6321301659476675212_w.jpg",

    url: "",

    height: 450,
  },
  {
    id: "10",

    img: "/photos/photo_6321301659476675178_y.jpg",

    url: "",

    height: 250,
  },
  {
    id: "11",

    img: "/photos/photo_6321301659476675152_y.jpg",

    url: "",

    height: 300,
  },
  {
    id: "12",

    img: "/photos/photo_6321301659476675162_w.jpg",

    url: "",

    height: 350,
  },
  {
    id: "13",

    img: "/photos/photo_6321301659476675203_w.jpg",

    url: "",

    height: 350,
  },

  {
    id: "14",

    img: "/photos/photo_6321301659476675213_w.jpg",

    url: "",

    height: 400,
  },

  {
    id: "15",

    img: "/photos/photo_6321301659476675173_w.jpg",

    url: "",

    height: 500,
  },

  {
    id: "16",

    img: "/photos/photo_6321301659476675166_w.jpg",

    url: "",

    height: 300,
  },
  {
    id: "17",

    img: "/photos/photo_6321301659476675159_w.jpg",

    url: "",

    height: 550,
  },
  {
    id: "18",

    img: "/photos/photo_6321301659476675180_w.jpg",

    url: "",

    height: 400,
  },

  {
    id: "19",

    img: "/photos/photo_6321301659476675177_w.jpg",

    url: "",

    height: 400,
  },

  {
    id: "20",

    img: "/photos/photo_6321301659476675168_w.jpg",

    url: "",

    height: 600,
  },

  {
    id: "21",

    img: "/photos/photo_6321301659476675154_y.jpg",

    url: "",

    height: 500,
  },
  {
    id: "22",

    img: "/photos/photo_6321301659476675181_w.jpg",

    url: "",

    height: 350,
  },
  {
    id: "23",

    img: "/photos/photo_6321301659476675160_w.jpg",

    url: "",

    height: 350,
  },
  {
    id: "24",

    img: "/photos/photo_6321301659476675201_w.jpg",

    url: "",

    height: 250,
  },
];

const Photos = () => {
  return (
    <section
      id="photos"
      aria-labelledby="photos-heading"
      className="px-6 py-20 text-center bg-pink-50"
    >
      <h2 className="text-3xl font-bold text-pink-500 mb-10">and some more!</h2>
      <div>
        <Masonry
          items={items}
          ease="power4.out"
          duration={0.8}
          stagger={0.1}
          animateFrom="bottom"
          scaleOnHover={true}
          hoverScale={0.95}
          blurToFocus={true}
        />
      </div>
    </section>
  );
};

export default Photos;

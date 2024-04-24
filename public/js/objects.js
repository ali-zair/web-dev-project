import path from "path";
import fs from "fs-extra";

const date1 = new Date("2024-03-19");
const date2 = new Date("2024-03-20");
const date3 = new Date("2024-03-21");
const date4 = new Date("2024-03-22");
const date5 = new Date("2024-03-23");


const users = [
  {
		uid: 52,
    name: "Sid",
    surname: "Thomas",
    address: "4073 Hayhurst Lane Southfield, MI 48075",
    username: "sthomas",
    password: "thomas123",
    balance: 5000,
    itemsPurchased: [
      {
				orderNo: 123123,
				itemId: 309,
				shippingAddress: "4073 Hayhurst Lane Southfield, MI 48075",
				quantity: 2,
				date: date1.toISOString(),
				shippingType: "Standard",
      },
    ],
  },
  {
		uid: 28,
    name: "Lucy",
    surname: "Batts",
    address: "3121 Bottom Lane Gasport, NY 14067",
    username: "lbatts",
    password: "batts123",
    balance: 1000,
    itemsPurchased: [
      {
				orderNo: 124124,
				itemId: 265,
				shippingAddress: "3121 Bottom Lane Gasport, NY 14067",
				quantity: 1,
        date: date2,
        shippingType: "Express",
      },
    ],
  },
  {
		uid: 92,
    name: "Tammy",
    surname: "Scudder",
    address: "253 Michigan Avenue Connellsville, PA 15425",
    username: "tscudder",
    password: "scudder123",
    balance: 1500,
    itemsPurchased: [
      {
				orderNo: 124124,
				itemId: 401,
				shippingAddress: "253 Michigan Avenue Connellsville, PA 15425",
				quantity: 3,
				date: date3,
				shippingType: "Priority Mail",
      },
    ],
  },
  {
		uid: 18,
    name: "James",
    surname: "Lemus",
    address: "4985 Roane Avenue Beltsville, MD 20705",
    username: "jlemus",
    password: "lemus123",
    balance: 2000,
    itemsPurchased: [
      {
				orderNo: 125125,
        itemId: 604,
        shippingAddress: "4985 Roane Avenue Beltsville, MD 20705",
        quantity: 1,
        date: date4,
        shippingType: "Standard",
      },
    ],
  },
  {
		uid: 64,
    name: "Jill",
    surname: "Bowden",
    address: "4648 Howard Street Grand Rapids, MI 49503",
    username: "jbowden",
    password: "bowden123",
    balance: 2500,
    itemsPurchased: [
      {
				orderNo: 126126,
        itemId: 367,
        shippingAddress: "4648 Howard Street Grand Rapids, MI 49503",
        quantity: 4,
        date: date5,
        shippingType: "Standard",
      },
    ],
  },
  { username: "admin1", password: "admin123" },
  { username: "admin2", password: "admin123" },
  { username: "admin3", password: "admin123" },
  {
    sid: 123,
    company: "System76 Inc.",
    username: "system76",
    password: "system76123",
		itemsOwned: [309, 265, 150, 401, 604, 367],
    bankAccount: {
      accountNumber: 91219092,
      balance: 25340,
    },
  },
  {
    sid: 823,
    company: "Framework",
    username: "framework",
    password: "framework123",
		itemsOwned: [],
    bankAccount: {
      accountNumber: 82013290,
      balance: 2830,
    },
  },
  {
    sid: 136,
    company: "Tuxedo Computers",
    username: "tuxedo",
    password: "tuxedo123",
		itemsOwned: [],
    bankAccount: {
      accountNumber: 61826742,
      balance: 8210,
    },
  },
];

const items = [
  {
    id: 309,
    thumbnail: "img/lemur-pro.png",
    title: "System76 Lemur Pro",
    note: "Best everyday laptop!",
    features: [
      "Lightest, thinnest laptop",
      "16:10 screen ratio (1200p)",
      "Opens to 180°",
      "Intel Core Ultra (Series 1)",
    ],
    price: 1399,
    quantity: 2,
    extra_details:
      "Set out into the world with the 2.2-pound Lemur Pro — the lightest in its class. A 180° hinge and up to 14 hours of battery life make for a flexible schedule. When the lid is closed, this laptop sits well under 1 inch tall and will easily fit in most bags.",
  },
  {
    id: 265,
    thumbnail: "img/pangolin.png",
    title: "System76 Pangolin",
    note: "Best graphics!",
    features: [
      "Fast AMD CPU",
      "Best integrated graphics",
      "Camera privacy switch",
      "Quick storage access",
    ],
    price: 1299,
    quantity: 10,
    extra_details:
      "Sleek magnesium alloy build, beautiful 16-inch display, and up to 10 hours of battery life round out the Pangolin’s portfolio. Pursue ambition with a fast AMD chip and 32GB RAM, or kick back with your favorite game on integrated Radeon graphics. With all eyes on your System76 laptop, you’re bound to meet new allies along the way",
  },
  {
    id: 150,
    thumbnail: "img/darter-pro.png",
    title: "System76 Darter Pro",
    note: "Most premium build!",
    features: [
      'Compact 15"',
      "12-Core CPU",
      "DDR5 RAM (96GB max)",
      "Most ports including microSD reader",
    ],
    price: 1500,
    quantity: 5,
    extra_details:
      "The Darter Pro is small for its 15” size. A short depth and thin bezel make this a highly portable laptop. With the lid, top case, and bottom case all made of a black magnesium alloy, the Darter Pro is also one of our most durable.Prepare yourself in the field with a wide variety of ports, glare-resistant 1080p display, up to 9 hours of battery life, and up to 8TB of storage.",
  },
  {
    id: 401,
    thumbnail: "img/adder-ws.png",
    title: "System76 Adder WS",
    note: "Most affordable high-end performance!",
    features: ["24-core CPU", "NVIDIA 40-Series", "DDR5 RAM", "PCIe 4.0 SSDs"],
    price: 1699,
    quantity: 9,
    extra_details:
      "Whether you're at the lab, in the studio, or exploring a virtual world, accelerate progress with a machine as powerful as your ambition. System76 powerful laptops are built with the high-end components you need to make your vision a reality.",
  },
  {
    id: 604,
    thumbnail: "img/serval-ws.png",
    title: "System76 Serval WS",
    note: "Most affordable 4K display!",
    features: [
      "Fast USB speeds",
      "Premium build",
      '165Hz refresh rate (15")',
      '2K or 4K display (17")',
    ],
    price: 2099,
    quantity: 4,
    extra_details:
      "AI has rendered society an ever-changing landscape. How will you change it for the better? With an HX-class CPU, NVIDIA 40 Series graphics, the Serval WS is professional-grade power. Use it to fulfill your creative and research goals before your competition.Serval WS laptop opened front view with a protein render in the screen. ",
  },
  {
    id: 367,
    thumbnail: "img/bonobo-ws.png",
    title: "System76 Bonobo WS",
    note: "Most powerful!",
    features: [
      "24-core Intel i9 processor",
      "NVIDIA RTX 4080 or 4090",
      "2K 240Hz or 4K 144Hz display",
      "Massive trackpad",
    ],
    price: 3299,
    quantity: 6,
    extra_details:
      "Industry leaders need industry-leading power, and the Bonobo WS is System76's most powerful laptop. Its kit includes a 24-core CPU, up to 96GB DDR5 RAM, NVIDIA RTX 4080 or 4090 graphics, PCIe 4.0 storage, fast USB 3.2 Gen 2 transfer speeds, and a 2K or 4K display. Are you ready for your conference talk? ",
  },
];

fs.writeJson(path.join(process.cwd(), "js/data/users.json"), users);
fs.writeJson(path.join(process.cwd(), "js/data/items.json"), items);
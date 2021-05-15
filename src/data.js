const events = [
  {
    id: "E00001",
    name: "外澳淨灘",
    content: "淨灘淨灘淨灘",
    location: "110台北市信義區基隆路一段178號", // OR longitude and latitude
    
      startTime: {"firebase的物件"},
      endTime: {"firebase的物件"}, // Timestamp
    
    coverImage:
      "https://images.unsplash.com/photo",
    hosterId: "H00001",
    participants: [
      {
        id: "U00001",
        status: 0, // 0 = wait for approval, 1 = approved, 2 = completed, 9 = cancelled
        attend: false,
        comment: "",
      },
      {
        id: "U00002",
        status: "2", // 0 = wait for approval, 1 = approved, 2 = completed, 9 = cancelled
        attend: false,
        comment: "",
      },
    ],
    resultImage: [
      "https://images.unsplash.com/photo",
      "https://images.unsplash.com/photo",
    ] 
  },
];

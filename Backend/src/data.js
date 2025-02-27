const rows = [
  {
    id: 1,
    name: "Root Folder",
    type: "folder",
    lastModified: "2024-12-12",
    created: "2024-01-15",
    size: 5, // Number of files/folders inside
    private: true,
    users: ["user1@example.com", "user2@example.com"],
    contents: [
      {
        id: 2,
        name: "Sub Folder 1",
        type: "folder",
        lastModified: "2024-12-10",
        created: "2024-02-20",
        size: 4,
        private: false,
        contents: [
          {
            id: 3,
            name: "File 1",
            type: "file",
            lastModified: "2024-12-05",
            created: "2024-03-01",
            size: "2 MB",
            private: false,
          },
          {
            id: 4,
            name: "File 2",
            type: "file",
            lastModified: "2024-12-06",
            created: "2024-03-05",
            size: "1 MB",
            private: true,
            users: ["user1@example.com"],
          },
          {
            id: 8,
            name: "File 4",
            type: "file",
            lastModified: "2024-12-07",
            created: "2024-03-10",
            size: "1.5 MB",
            private: false,
          },
          {
            id: 9,
            name: "File 5",
            type: "file",
            lastModified: "2024-12-08",
            created: "2024-03-15",
            size: "700 KB",
            private: true,
            users: ["user2@example.com"],
          },
        ],
      },
      {
        id: 5,
        name: "File 3",
        type: "file",
        lastModified: "2024-12-08",
        created: "2024-04-10",
        size: "500 KB",
        private: false,
      },
      {
        id: 6,
        name: "Sub Folder 2",
        type: "folder",
        lastModified: "2024-12-11",
        created: "2024-06-01",
        size: 3,
        private: true,
        users: ["user3@example.com", "user4@example.com"],
        contents: [
          {
            id: 7,
            name: "Nested File 1",
            type: "file",
            lastModified: "2024-12-09",
            created: "2024-06-15",
            size: "3 MB",
            private: false,
          },
          {
            id: 10,
            name: "Nested File 2",
            type: "file",
            lastModified: "2024-12-10",
            created: "2024-06-20",
            size: "1 MB",
            private: true,
            users: ["user3@example.com"],
          },
          {
            id: 11,
            name: "Nested File 3",
            type: "file",
            lastModified: "2024-12-11",
            created: "2024-06-25",
            size: "2.5 MB",
            private: false,
          },
        ],
      },
      {
        id: 11,
        name: "Sub Folder 2",
        type: "folder",
        lastModified: "2024-12-11",
        created: "2024-06-01",
        size: 3,
        private: true,
        users: ["user3@example.com", "user4@example.com"],
        contents: [
          {
            id: 7,
            name: "Nested File 1",
            type: "file",
            lastModified: "2024-12-09",
            created: "2024-06-15",
            size: "3 MB",
            private: false,
          },
          {
            id: 10,
            name: "Nested File 2",
            type: "file",
            lastModified: "2024-12-10",
            created: "2024-06-20",
            size: "1 MB",
            private: true,
            users: ["user3@example.com"],
          },
          {
            id: 11,
            name: "Nested File 3",
            type: "file",
            lastModified: "2024-12-11",
            created: "2024-06-25",
            size: "2.5 MB",
            private: false,
          },
        ],
      },
      {
        id: 11,
        name: "Sub Folder 2",
        type: "folder",
        lastModified: "2024-12-11",
        created: "2024-06-01",
        size: 3,
        private: true,
        users: ["user3@example.com", "user4@example.com"],
        contents: [],
      },
      {
        id: 11,
        name: "Sub Folder 2",
        type: "folder",
        lastModified: "2024-12-11",
        created: "2024-06-01",
        size: 3,
        private: true,
        users: ["user3@example.com", "user4@example.com"],
        contents: [
          {
            id: 7,
            name: "Nested File 1",
            type: "file",
            lastModified: "2024-12-09",
            created: "2024-06-15",
            size: "3 MB",
            private: false,
          },
          {
            id: 10,
            name: "Nested File 2",
            type: "file",
            lastModified: "2024-12-10",
            created: "2024-06-20",
            size: "1 MB",
            private: true,
            users: ["user3@example.com"],
          },
          {
            id: 11,
            name: "Nested File 3",
            type: "file",
            lastModified: "2024-12-11",
            created: "2024-06-25",
            size: "2.5 MB",
            private: false,
          },
        ],
      },
      {
        id: 4,
        name: "File 2",
        type: "file",
        lastModified: "2024-12-06",
        created: "2024-03-05",
        size: "1 MB",
        private: true,
        users: ["user1@example.com"],
      },
      {
        id: 8,
        name: "File 4",
        type: "file",
        lastModified: "2024-12-07",
        created: "2024-03-10",
        size: "1.5 MB",
        private: false,
      },
      {
        id: 9,
        name: "File 5",
        type: "file",
        lastModified: "2024-12-08",
        created: "2024-03-15",
        size: "700 KB",
        private: true,
        users: ["user2@example.com"],
      },
    ],
  },
];

// module.exports = rows;

export default rows;

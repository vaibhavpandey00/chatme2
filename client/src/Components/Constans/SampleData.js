export const sampleChats = [{
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "Jone Doe",
    _id: "1",
    groupChat: false,
    members: ["1", "2"],
},
{
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "Alvin Hill",
    _id: "2",
    groupChat: false,
    members: ["1", "2"],
},
{
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "Cecelia Clark",
    _id: "3",
    groupChat: false,
    members: ["1", "2"],
},
{
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "Millie Bell",
    _id: "4",
    groupChat: false,
    members: ["1", "2"],
},
{
    avatar: ["https://www.w3schools.com/howto/img_avatar.png",
        "https://www.w3schools.com/howto/img_avatar.png"],
    name: "Group Chat",
    _id: "69",
    groupChat: true,
    members: ["1", "2"],
},
{
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "Calvin Carson",
    _id: "56",
    groupChat: false,
    members: ["1", "2"],
},
{
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "Bernard Medina",
    _id: "83",
    groupChat: false,
    members: ["1", "2"],
},
{
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "Estelle Ryan",
    _id: "63",
    groupChat: false,
    members: ["1", "2"],
},
{
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "Lora Ward",
    _id: "71",
    groupChat: false,
    members: ["1", "2"],
},
{
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "Jonathan Sanchez",
    _id: "61",
    groupChat: false,
    members: ["1", "2"],
},
]

export const sampleUsers = [{
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "Jone Doe",
    _id: "1",
},
{
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "Alvin Hill",
    _id: "2",
},
]

export const sampleNotifications = [
    {
        sender: {
            avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
            name: "Jone Doe",
        },
        _id: "1",
    },
    {
        sender: {
            avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
            name: "Alvin Hill",
        },
        _id: "2",
    },
]

export const sampleMessage = [
    {
        attachments: [],
        content: "Hay there! how are you..",
        _id: "qwertyu1",
        sender: {
            _id: "user._id",
            name: "Vibhu",
        },
        chat: "chatId",
        createdAt: "2024-03-10"
    },
    {
        attachments: [
            {
                publick_id: "azxax",
                url: "https://www.w3schools.com/howto/img_avatar.png",
            },
        ],
        content: "",
        _id: "qwertyu2",
        sender: {
            _id: "asdcasd",
            name: "Guest",
        },
        chat: "chatId",
        createdAt: "2024-04-02"
    },
    {
        attachments: [],
        content: "Fine what about you..",
        _id: "qwertyu5",
        sender: {
            _id: "asdcasd",
            name: "Guest",
        },
        chat: "chatId",
        createdAt: "2024-04-02"
    },
    {
        attachments: [],
        content: "Happy to hear that :)",
        _id: "qwertyu3",
        sender: {
            _id: "user._id",
            name: "Vibhu",
        },
        chat: "chatId",
        createdAt: "2024-04-03"
    },
    {
        attachments: [],
        content: "Fine as well",
        _id: "qwertyu4",
        sender: {
            _id: "user._id",
            name: "Vibhu",
        },
        chat: "chatId",
        createdAt: "2024-04-03"
    },
]

export const dashboradData = {
    users: [
        {
            name: "Jone Doe",
            avatar: "https://www.w3schools.com/howto/img_avatar.png",
            _id: "1",
            username: "JoneDoe69",
            friends: 20,
            groups: 5
        },
        {
            name: "Isabella Garcia",
            avatar: "https://www.w3schools.com/howto/img_avatar.png",
            _id: "2",
            username: "Jone69",
            friends: 89,
            groups: 21
        },
        {
            name: "Michael Rogers",
            avatar: "https://www.w3schools.com/howto/img_avatar.png",
            _id: "3",
            username: "Doe69",
            friends: 79,
            groups: 75
        }
    ],

    chats: [
        {
            name: "Evan Turner",
            avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
            _id: "1",
            groupChat: true,
            members: [{ _id: "1", avatar: "https://www.w3schools.com/howto/img_avatar.png" }, { _id: "2", avatar: "https://www.w3schools.com/howto/img_avatar.png" }],
            totalMembers: 2,
            totalMessages: 20,
            creator: {
                name: "Jone Doe",
                avatar: "https://www.w3schools.com/howto/img_avatar.png"
            }
        },
        {
            name: "John Summers",
            avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
            _id: "2",
            groupChat: true,
            members: [{ _id: "1", avatar: "https://www.w3schools.com/howto/img_avatar.png" }, { _id: "2", avatar: "https://www.w3schools.com/howto/img_avatar.png" }],
            totalMembers: 2,
            totalMessages: 22,
            creator: {
                name: "John Summers",
                avatar: "https://www.w3schools.com/howto/img_avatar.png"
            }
        },
        {
            name: "Cecelia Clark",
            avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
            _id: "3",
            groupChat: false,
            members: [{ _id: "1", avatar: "https://www.w3schools.com/howto/img_avatar.png" }, { _id: "2", avatar: "https://www.w3schools.com/howto/img_avatar.png" }],
            totalMembers: 2,
            totalMessages: 49,
            creator: {
                name: "Cecelia Clark",
                avatar: "https://www.w3schools.com/howto/img_avatar.png"
            }
        }
    ],

    messages: [
        {
            attachments: [],
            content: "Hey there! how are you..",
            _id: "qwertyu",
            sender: {
                avatar: "https://www.w3schools.com/howto/img_avatar.png",
                name: "Owen Brewer",
            },
            chat: "chatId",
            groupChat: false,
            createdAt: "2024-03-10"
        },
        {
            attachments: [
                {
                    publick_id: "azxax11",
                    url: "https://www.w3schools.com/howto/img_avatar.png",
                }
            ],
            content: "M** Ch*da",
            _id: "qwertyu1",
            sender: {
                avatar: "https://www.w3schools.com/howto/img_avatar.png",
                name: "Shane Jensen",
            },
            chat: "chatId1",
            groupChat: false,
            createdAt: "2024-03-10"
        },
        {
            attachments: [
                {
                    publick_id: "azxax12",
                    url: "https://www.w3schools.com/howto/img_avatar.png",
                }
            ],
            content: "",
            _id: "qwertyu2",
            sender: {
                avatar: "https://www.w3schools.com/howto/img_avatar.png",
                name: "Jack Smith",
            },
            chat: "chatId3",
            groupChat: true,
            createdAt: "2024-03-10"
        }
    ]
}
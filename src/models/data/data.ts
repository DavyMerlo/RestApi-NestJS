import { AddressDto } from "../../address/dto/address.dto";
import { CategoryDto } from "../../category/dto/catogory.dto.type";
import { OrderDto } from "../../order/dto/order.dto";
import { OrderLineDto } from "../../orderline/dto/orderline.dto";
import { ProductDto } from "../../product/dto/product.dto";
import { SubCategoryDto } from "../../subcategory/dto/subcategory.dto.";
import { UserDto } from "../../user/dto/user.dto";
import { UserAddressDto } from "../../user.address/dto/useraddress.dto";
import { UserOrderDto } from "../../user.order/dto/userorder.dto";

export default class Data {

    static userData: UserDto[] = [
        { firstName: "Davy", lastName: "Merlo", email: "davymerlo@live.be",hash: "Merlo12345"},
        { firstName: "Wesley", lastName: "Merlo", email: "wesleymerlo@live.be",hash:"Merlo12345"},
    ];

    static addressData: AddressDto[] = [
        { street: "Rootstraat", houseNumber: "30", postalCode: "3630",city:"Maasmechelen",country: "Belgium"},
        { street: "Rootstraat", houseNumber: "20", postalCode: "3500",city:"Hasselt",country: "Belgium"},
    ];

    static userAddressData: UserAddressDto[] = [
        {userId: 1, addressId: 1},
        {userId: 2, addressId: 1},
        {userId: 2, addressId: 2},
    ];

    static productData: ProductDto[] = [
        { name: "The Shinning", description: "An eerie tale set in a remote hotel where dark forces are at play.", price: 24.99, release: new Date("2001-10-10"), subCategoryId: 1},
        { name: "Dracula", description: "The classic story of the bloodthirsty Count Dracula and his pursuit of victims.", price: 15.99, release: new Date("2002-12-10"), subCategoryId: 1},
        { name: "The Haunting of Hill House", description:"A narrative following a group of people staying in a haunted house where paranormal activity escalates.", price: 25.99, release: new Date("2008-05-12"), subCategoryId: 1},
        { name: "Pet Semantary", description: "A chilling story centered around a cemetery with sinister powers that bring the dead back to life.", price: 12.99, release: new Date("2000-06-01"), subCategoryId: 1},
        { name: "The Exorcist", description: "Involves a girl possessed by a demon and a priest's attempt to save her.", price: 19.99, release: new Date("2015-12-05"), subCategoryId: 1},
      
        { name: "Pride and Prejudice", description: "A classic romance novel revolving around the spirited Elizabeth Bennet and the proud Mr. Darcy.", price: 20.99, release: new Date("2005-10-10"), subCategoryId: 2},
        { name: "The Notebook", description: "A poignant love story between Noah Calhoun and Allie Nelson, spanning decades of their lives", price: 14.99, release: new Date("2006-12-15"), subCategoryId: 2},
        { name: "Outlander", description:" A time-traveling romance between Claire Randall, a World War II nurse, and Jamie Fraser, a Scottish warrior.", price: 35.99, release: new Date("2008-08-12"), subCategoryId: 2},
        { name: "Me Before You", description: "A heartfelt story about Louisa Clark, a caregiver, and Will Traynor, a paralyzed man, and their unexpected bond.", price: 14.99, release: new Date("2001-06-05"), subCategoryId: 2},
        { name: "The Time Traveler's Wife", description: "A unique love story about Henry, a time traveler, and Clare, his wife, navigating the complexities of their relationship through time travel.", price: 11.99, release: new Date("2014-12-01"), subCategoryId: 2},
      
        { name: "De Da Vinci Code", description: "An immersive thriller centered around a murder investigation in Paris, involving symbols, codes, and ancient secrets.", price: 19.99, release: new Date("2005-10-10"), subCategoryId: 2},
        { name: "Gone Gir", description: "This book follows the story of a man whose wife suddenly disappears on their fifth wedding anniversary. It reveals dark secrets and takes unexpected turns.", price: 14.99, release: new Date("2009-12-15"), subCategoryId: 3},
        { name: "The Girl with the Dragon Tattoo", description:"A complex thriller revolving around a missing woman and a journalist who embarks on an in-depth investigation into her disappearance.", price: 24.99, release: new Date("2009-08-12"), subCategoryId: 3},
        { name: "The Girl on the Train", description: " A story about a woman who witnesses a disturbing event during her daily train ride and becomes involved in a complicated missing person's case.", price: 14.99, release: new Date("2001-06-05"), subCategoryId: 3},
        { name: "The Silence of the Lambs", description: "A chilling thriller where a young FBI agent collaborates with a brilliant yet terrifying serial killer to track down another serial murderer.", price: 11.99, release: new Date("2013-12-01"), subCategoryId: 3},
      
        { name: "Thriller - Micheal Jackson", description: "Dit album, uitgebracht in 1982, is een van de best verkochte albums aller tijden. Het bevat hits als Thriller, Billie Jean, en Beat It.", price: 12.99, release: new Date("2005-10-10"), subCategoryId: 4},
        { name: "Abbey Road - The Beatles ", description: "Dit legendarische album uit 1969 bevat klassiekers als Come Together, Here Comes the Sun, en Something", price: 13.99, release: new Date("2009-12-15"), subCategoryId: 4},
        { name: "The Fame - Lady Gaga", description:"Dit debuutalbum van Lady Gaga, uitgebracht in 2008, bracht hits als Just Dance, Poker Face, en Paparazzi.", price: 14.99, release: new Date("2007-08-12"), subCategoryId: 4},
        { name: "Rumours - Fleetwood Mac ", description: "Uitgebracht in 1977, bevat dit album tijdloze tracks als Go Your Own Way, Dreams, en The Chain.", price: 10.99, release: new Date("2001-06-05"), subCategoryId: 4},
        { name: "Bad - Michael Jackson", description: "Een ander iconisch album van Michael Jackson, uitgebracht in 1987, met hits als Smooth Criminal, The Way You Make Me Feel, en natuurlijk Bad.", price: 11.99, release: new Date("2001-12-01"), subCategoryId: 4},
      
        { name: "Beethoven: Symphony No. 9", description: "Also known as the Ode to Joy, this symphony by Beethoven is one of his most iconic works, recognized for its majestic and powerful music.", price: 15.99, release: new Date("1997-10-10"), subCategoryId: 5},
        { name: "Mozart: Requiem", description: " This piece by Wolfgang Amadeus Mozart, left unfinished at his death, stands as one of the most beloved requiems in classical music history.", price: 12.99, release: new Date("1999-12-15"), subCategoryId: 5},
        { name: "Bach: Brandenburg Concertos", description:"ohann Sebastian Bach's Brandenburg Concertos are a collection of six instrumental works, each with a unique instrumental composition and masterful construction.", price: 14.99, release: new Date("2007-08-12"), subCategoryId: 5},
        { name: "Vivaldi: The Four Seasons", description: "Antonio Vivaldi's masterpiece presents four violin concertos, each depicting a season of the year with vivid and expressive music.", price: 12.99, release: new Date("1998-06-05"), subCategoryId: 5},
        { name: "Tchaikovsky: Swan Lake", description: "This ballet by Pyotr Ilyich Tchaikovsky features one of the most iconic and beautiful classical scores, filled with melodious and emotional themes.", price: 15.99, release: new Date("2001-12-01"), subCategoryId: 5},
      
        { name: "The Miseducation of Lauryn Hill - Lauryn Hill", description: "Released in 1998, this album by Lauryn Hill combines elements of R&B, hip-hop, and soul, featuring hits like Doo Wop (That Thing) and Ex-Factor.", price: 14.99, release: new Date("2003-08-10"), subCategoryId: 6},
        { name: "Confessions - Usher", description: "Usher's 2004 album Confessions includes chart-topping tracks like Yeah!, Burn, and Confessions Part II, showcasing his signature smooth vocals.", price: 15.99, release: new Date("2000-12-15"), subCategoryId: 6},
        { name: "Aaliyah - Aaliyah", description:"Released in 2001, this self-titled album by Aaliyah is remembered for its innovative R&B sound, including tracks like Rock the Boat and More Than a Woman.", price: 9.99, release: new Date("2007-09-12"), subCategoryId: 6},
        { name: "Channel Orange - Frank Ocean", description: "Frank Ocean's debut studio album from 2012, Channel Orange, features a blend of R&B, funk, and soul, with standout tracks such as Thinkin Bout You and Pyramids.", price: 12.99, release: new Date("1998-06-05"), subCategoryId: 6},
        { name: "The Writing's on the Wall - Destiny's Child", description: "This 1999 album by Destiny's Child contains R&B and pop-infused tracks like Bills, Bills, Bills, Say My Name, and Bug a Boo.", price: 12.99, release: new Date("2005-12-01"), subCategoryId: 6},
      
        { name: "Call of Duty", description: "Known for its intense multiplayer and gripping campaigns, this franchise includes various titles like Modern Warfare, Black Ops, and Warzone, offering realistic combat experiences.", price: 59.99, release: new Date("2022-10-10"), subCategoryId: 7},
        { name: "Halo", description: "Exclusive to Xbox platforms, Halo introduced a gripping sci-fi narrative and addictive multiplayer, with titles like Halo: Combat Evolved, Halo 2, and the more recent Halo Infinite.", price: 54.99, release: new Date("2020-12-10"), subCategoryId: 7},
        { name: "DOOM", description:" A reboot of the iconic franchise, DOOM brought back the fast-paced, demon-slaying action with modern graphics and gameplay mechanics.", price: 64.99, release: new Date("2018-08-12"), subCategoryId: 7},
        { name: "Counter-Strike: Global Offensive", description: "This popular multiplayer first-person shooter focuses on tactical gameplay, teamwork, and precise aiming, drawing millions of players worldwide.", price: 54.99, release: new Date("2018-06-01"), subCategoryId: 7},
        { name: "Overwatch", description: "Blizzard's team-based shooter emphasizes diverse characters with unique abilities, fostering teamwork and strategy in fast-paced matches.", price: 54.99, release: new Date("2019-12-05"), subCategoryId: 7},
      
        { name: "Forza Horizon", description: "Renowned for its open-world racing and stunning visuals, this series offers an expansive map for exploration and various racing events. Forza Horizon 4 and Forza Horizon 5 are notable installments.", price: 59.99, release: new Date("2022-10-10"), subCategoryId: 8},
        { name: "Gran Turismo", description: "Exclusive to PlayStation, Gran Turismo is celebrated for its realistic driving physics and extensive car collection. Gran Turismo Sport and Gran Turismo 7 are popular titles.", price: 54.99, release: new Date("2020-12-10"), subCategoryId: 8},
        { name: "Mario Kart", description:"A fun and iconic kart-racing series by Nintendo featuring beloved characters, power-ups, and imaginative tracks. Titles like Mario Kart 8 Deluxe offer family-friendly racing fun.", price: 64.99, release: new Date("2018-08-12"), subCategoryId: 8},
        { name: "F1", description: " Developed by Codemasters, these games provide an immersive Formula 1 racing experience, allowing players to compete in the world's most prestigious racing events. Titles include F1 2021 and its predecessors.", price: 54.99, release: new Date("2018-06-01"), subCategoryId: 8},
        { name: "Need for Speed: Hot Pursuit", description: "Known for its thrilling high-speed police chases, this game combines exotic cars, intense racing, and pursuits, providing an adrenaline-filled experience.", price: 54.99, release: new Date("2018-10-05"), subCategoryId: 8},
      
        { name: "The Legend of Zelda: Breath of the Wild", description: "This game offers an expansive open-world environment where players embark on a grand adventure, solving puzzles, battling enemies, and exploring a vast landscape filled with secrets.", price: 45.99, release: new Date("2022-10-10"), subCategoryId: 9},
        { name: "Uncharted", description: " Following the adventures of Nathan Drake, these games combine action-packed gameplay with cinematic storytelling. Players navigate through thrilling environments, solve puzzles, and engage in intense combat.", price: 49.99, release: new Date("2018-12-10"), subCategoryId: 9},
        { name: "Tomb Raider", description:"Featuring the iconic Lara Croft, this series follows her archaeological adventures in various exotic locations. It combines exploration, puzzle-solving, and action-packed sequences.", price: 49.99, release: new Date("2020-08-12"), subCategoryId: 9},
        { name: "Horizon Zero Dawn", description: " Set in a post-apocalyptic world where robotic creatures roam, players assume the role of Aloy, exploring the vast landscapes, battling machines, and uncovering the mysteries of the world.", price: 45.99, release: new Date("2019-06-08"), subCategoryId: 9},
        { name: "The Witcher 3: Wild Hunt", description: "This game follows Geralt of Rivia in a vast open world, offering a rich narrative, immersive quests, and choices that impact the game's storyline and world.", price: 64.99, release: new Date("2018-10-01"), subCategoryId: 9},
    ];
  
    static categoryData: CategoryDto[] = [
        { name: "Books"},
        { name: "Music"},
        { name: "Games"}
    ];

    static subCategoryData: SubCategoryDto[] = [
        { name: "Horror", categoryId:1},
        { name: "Romance", categoryId:1},
        { name: "Thriller", categoryId:1},
        { name: "Pop", categoryId:2},
        { name: "Classic", categoryId:2},
        { name: "Rnb", categoryId:2},
        { name: "Shooter", categoryId:3},
        { name: "Racing", categoryId:3},
        { name: "Adventure", categoryId:3},
    ];

    static orderData: OrderDto[] = [
        {userId: null, date:  new Date("2023-01-03"), order_lines: null},
        {userId: null, date:  new Date("2023-01-05"), order_lines: null},
    ];

    static orderLineData: OrderLineDto[] = [
        {productId: 1, orderId: 1, quantity: 2},
        {productId: 6, orderId: 1, quantity: 1},
        {productId: 10, orderId: 1, quantity: 2},
        {productId: 12, orderId: 2, quantity: 3},
        {productId: 20, orderId: 2, quantity: 1},
    ];

    static userOrderData: UserOrderDto[] = [
        {userId: 2, orderId: 1},
        {userId: 2, orderId: 2},
    ];
  }
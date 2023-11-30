// import imgUrlOne from '../garmentz-flyer.jpeg';
// import imgUrlTwo from '../lillistar-flyer.jpeg';
import broken_planet from '../broken_planet.jpeg';
import ceec from '../ceec.jpeg'
import bb_simon from '../bb_simon.jpeg'
import goodtaste from '../good-taste.jpeg'
import jreid from '../jreid.jpeg'
import ghetto_dreams from '../ghetto_dreams.jpeg'
import ghetto_friends from '../ghetto_friends.jpeg'
import wepyo from '../wepyo.jpeg'
import roy_pl from '../roy_pl.jpeg'
import bowery_nyfw from '../tia_apollo.png'
import bs_bp from '../bs x bp public arts.png'
import wisdom_kaye from '../wsdm_afterparty.png'
const eventsList = [
   {
      id: 'wisdom-kaye-nyfw',
      name: 'Wisdom Kaye NYFW Party',
      date: '10/12/2023',
      startTime: '10PM',
      endTime: 'LATE',
      tz: 'est',
      type: 'nightlife',
      location: '2 Thompson St, New York, NY',
      location_url: 'https://www.google.com/maps/place/Evol+NewYork/@40.7219417,-74.0075678,17z/data=!3m1!4b1!4m6!3m5!1s0x89c259a0eb5a090d:0x4791697fc682454f!8m2!3d40.7219417!4d-74.0049929!16s%2Fg%2F11k9zbygld?entry=ttu',
      venue: 'Evol New York',
      venue_url:'https://www.evolclubnyc.com/',      
      imgUrl: wisdom_kaye,
      description: ``,
      lockAddress: '0x643620e07061d02233c489435a535b8d123a422e',
      priceUSD: 10,
      email_template: 'N/A',
      vendors: [
        { name: 'Wisdom Kaye', instagram: 'https://www.instagram.com/wisdm/', website: null},
        {name: 'Bowery Showroom', instagram: 'https://www.instagram.com/boweryshowroom/', website: 'https://boweryshowroom.com/'}
      ],
      cardColor: "#6C7066"
   },
   {
      id: 'bs-bp-public-arts',
      name: 'Broken Planet x Bowery Showroom NYFW Party',
      date: '10/10/2023',
      startTime: '9PM',
      endTime: '2AM',
      tz: 'est',
      type: 'nightlife',
      location: '15 Chrystie St, New York, NY',
      location_url: 'https://www.google.com/maps/place/215+Chrystie+St,+New+York,+NY+10002/data=!4m2!3m1!1s0x89c25985b59b7161:0xa08a1ae431a26c9c?sa=X&ved=2ahUKEwjOgI2rnaGBAxXGkYkEHfHiCqYQ8gF6BAgPEAA&ved=2ahUKEwjOgI2rnaGBAxXGkYkEHfHiCqYQ8gF6BAgZEAI',
      venue: 'Public Arts',
      venue_url:'https://www.brokenplanetmarket.com/',      
      imgUrl: bs_bp,
      description: `Join Broken Planet and Bowery Showroom for additional NYFW festivities at the stunning Public Hotel.

      Enjoy an open bar from 9-10pm and an exclusive performance by Lil Tecca.
      
      Plus, groove to the beats of DJs Levar, Bad Company, Guiseppe, Bandsome Will, Senai, & Lil Fax Machine.
      
      Secure your spot on the guest list by RSVPing on NAMELESS.`,
      lockAddress: '0xCE11040C9791523F70d8AC792a4E300b3CE662a0',
      priceUSD: 0,
      email_template: 'N/A',
      vendors: [
        { name: 'Broken Planet', instagram: 'https://www.instagram.com/brokenplanet/', website: 'https://www.brokenplanetmarket.com/'},
        {name: 'Bowery Showroom', instagram: 'https://www.instagram.com/boweryshowroom/', website: 'https://boweryshowroom.com/'}
      ],
      cardColor: "#98E5B4"
   },
   {
      id: 'jreid-popup',
      name: 'J. Reid Pop Up',
      date: '10/6/2023',
      startTime: '12PM',
      endTime: '8PM',
      tz: 'est',
      location: '57 Stanton St, New York, NY',
      location_url: 'https://www.google.com/maps/place/Bowery+Showroom/@40.7218684,-73.9928603,17z/data=!3m1!4b1!4m6!3m5!1s0x89c2599e567e729d:0xd4292a3e3e8ead23!8m2!3d40.7218684!4d-73.99028!16s%2Fg%2F11r9svhbxl?entry=ttu',
      venue: 'Bowery Showroom',
      venue_url:'https://boweryshowroom.com/',
      imgUrl: jreid,
      description: 'J.Reid is a premiere Black-owned, southern-based brand that offers premium clothing that is fashionable, functional, and comfortable. The brand prides itself on producing high-quality and high-vibrational clothing designs using sustainable and ethical business practices.',
      lockAddress: '0xfa3339191d4d8c63984653b3f75d165d7e18186c',
      priceUSD: 0,
      email_template: 'RSVP CONFIRMATION 9/11 - J. Reid Pop Up',
      vendors: [

      ],
      cardColor: "#172232"
   },
   {
      id: 'ghetto-dreams-popup',
      name: 'Ghetto Dreams Popup',
      date: '10/2/2023',
      startTime: '12PM',
      endTime: '8PM',
      tz: 'est',
      location: '57 Stanton St, New York, NY',
      location_url: 'https://www.google.com/maps/place/Bowery+Showroom/@40.7218684,-73.9928603,17z/data=!3m1!4b1!4m6!3m5!1s0x89c2599e567e729d:0xd4292a3e3e8ead23!8m2!3d40.7218684!4d-73.99028!16s%2Fg%2F11r9svhbxl?entry=ttu',
      venue: 'Bowery Showroom',
      venue_url:'https://boweryshowroom.com/',
      imgUrl: ghetto_dreams,
      description: 'Ghetto Dreams is a Latinx-owned brand with Chicano streetwear influences. The brand often incorporates iconic Latin-American imagery such as Lady Guadalupe. The brand’s motto “a safe place for the underdogs, join us” signals the brand’s democratic approach to fashion at large.',
      lockAddress: '0xceb45df0b08456341068deab8da29bd803d93db3',
      priceUSD: 0,
      email_template: 'RSVP CONFIRMATION 9/12 - Ghetto Dreams Pop Up',
      vendors: [
         {name: 'Ghetto Dreams', instagram: 'https://www.instagram.com/ghettodreams.inc/', website: 'https://www.ghettodreams.co/'},
      ],
      cardColor: "#2A4C58"
   },
   {
      id: 'ghetto-friends-popup',
      name: 'Ghetto Friends x Bowery Showroom Capsule Pop Up',
      date: '9/13/2023',
      startTime: '12PM',
      endTime: '8PM',
      tz: 'est',
      location: '57 Stanton St, New York, NY',
      location_url: 'https://www.google.com/maps/place/Bowery+Showroom/@40.7218684,-73.9928603,17z/data=!3m1!4b1!4m6!3m5!1s0x89c2599e567e729d:0xd4292a3e3e8ead23!8m2!3d40.7218684!4d-73.99028!16s%2Fg%2F11r9svhbxl?entry=ttu',
      venue: 'Bowery Showroom',
      venue_url:'https://boweryshowroom.com/',
      imgUrl: ghetto_friends,
      description: 'Ghetto Friends is an LA-based streetwear brand founded and run by two brothers. The pair hand-make innovative clothes with Latin-American influences in their in-house studio. Highlights of their unique product selection include custom distressed denim jeans and cut-and-sew pieces. Bowery Showroom and Ghetto Friends will be releasing their annual NYFW collab denim at the showroom.',
      lockAddress: '0x8E512079B704bF4f291c395205A66f02ba04EaC6',
      priceUSD: 0,
      email_template: 'RSVP CONFIRMATION 9/13 - Ghetto Friends Pop Up',
      vendors: [
         {name: 'Ghetto Friends', instagram: 'https://www.instagram.com/ghettofriends/', website: 'https://www.ghettofriends.com/'},
      ],
      cardColor: "#B19D8E"
   },
   {
      id: 'wepyo-popup',
      name: 'W﻿EPYO Pop Up',
      date: '9/14/2023',
      startTime: '12PM',
      endTime: '7PM',
      tz: 'est',
      location: '57 Stanton St, New York, NY',
      location_url: 'https://www.google.com/maps/place/Bowery+Showroom/@40.7218684,-73.9928603,17z/data=!3m1!4b1!4m6!3m5!1s0x89c2599e567e729d:0xd4292a3e3e8ead23!8m2!3d40.7218684!4d-73.99028!16s%2Fg%2F11r9svhbxl?entry=ttu',
      venue: 'Bowery Showroom',
      venue_url:'https://boweryshowroom.com/',
      imgUrl: wepyo,
      description: 'WEPYO, short for “We Put You On,” is an e-commerce marketplace known for connecting consumers with emerging brands. WEPYO prides itself on protecting the culture, helping create the wave, and putting consumers onto cutting-edge fashion. The brand’s motto, “where fashion meets you,” is indicative of the brand’s mission of helping users find their style and brands connect to their target demographic-- forging a community of creatives.',
      lockAddress: '0x95C5a937304696Be1c047f19c26dfb08d4255F6F',
      priceUSD: 0,
      email_template: 'RSVP CONFIRMATION 9/14 - WEPYO Pop Up',
      vendors: [
         {name: 'WEPYO', instagram: 'https://www.instagram.com/wepyo/', website: null},
      ],
      cardColor: "#4C4340"
   },
   {
      id: 'roy-ao-fpl-popup',
      name: 'Roy Private Label, Attachments Online, Fait Par Lui Pop Up',
      date: '9/15/2023',
      startTime: '12PM',
      endTime: '8PM',
      tz: 'est',
      location: '57 Stanton St, New York, NY',
      location_url: 'https://www.google.com/maps/place/Bowery+Showroom/@40.7218684,-73.9928603,17z/data=!3m1!4b1!4m6!3m5!1s0x89c2599e567e729d:0xd4292a3e3e8ead23!8m2!3d40.7218684!4d-73.99028!16s%2Fg%2F11r9svhbxl?entry=ttu',
      venue: 'Bowery Showroom',
      venue_url:'https://boweryshowroom.com/',      
      imgUrl: roy_pl,
      description: 'Roy Private Label is a New York City based streetwear brand known for innovative yet wearable silhouettes available for purchase at fair prices./n Attachments Online is an emerging designer specializing in hand-made garments crafted by their in-house atelier team. Their most recent collection showcases their distinct perspective on punk aesthetics. The label also produces custom samples and patterns for customers interested in creation and customization./nFait Par Lui, which translates into “Made by Him,” is a Los Angeles-based brand that creates thoughtfully designed and meticulously executed pieces. The brand’s owner, More Murdah, describes every piece he launches as a work of art. The brand is known for producing hand-made clothes of the highest quality in-house.',
      lockAddress: '0x46a63deDEd194cf2b5EAb4d19741e78Ef9aB8AFc',
      priceUSD: 0,
      email_template: 'RSVP CONFIRMATION 9/15 - Bowery Showroom NYFW',
      vendors: [
         {name: 'Roy Private Label', instagram: 'https://www.instagram.com/royprivatelabel', website: 'https://royprivatelabel.com/'},
         {name: 'Attachments Online', instagram: 'https://www.instagram.com/attachmentsonline/', website: 'https://attachmentsonline.store/'},
         {name: 'Faitparlui', instagram: 'https://www.instagram.com/moremurdah/?hl=en', website: 'https://faitparlui.com/'},
      ],
      cardColor: "#373D49"
      
   },
   {
      id: 'bowery-nyfw-afterparty',
      name: 'Bowery NYFW After Party',
      date: '11/9/2023',
      startTime: '10pm',
      endTime: 'Late',
      tz: 'est',
      location: 'Harbor NYC - 621 W 46th St, New York, NY',
      location_url: 'https://www.google.com/maps/place/Harbor+NYC+Rooftop/@40.7640139,-74.0002123,17z/data=!3m1!4b1!4m6!3m5!1s0x89c2584e58291bc3:0xd6293ddbe674423!8m2!3d40.7640139!4d-73.9976374!16s%2Fm%2F0k1btgb?entry=ttu',
      imgUrl: bowery_nyfw,
      description: 'Join us this Saturday, Sept 9 from 10pm-late for the official NYFW Tia Adeola Afterparty presented by Bowery Showroom & B.B. Simon. There will also be many special guests, celebrities, press, influencers, featuring Coi Leray. The opening act will feature Jenn Carter, Kyle Richh, and Tata (41). Sponsored by 100 Coconuts.',
      lockAddress: '0xA91c2e18d7D1a24407074Ae459914b1E933279d0',
      priceUSD: 50,
      email_template: 'ORDER CONFIRMATION 9/9 - NYFW AFTERPARTY',
      vendors: [
         {name: 'Bowery Showroom', instagram: 'https://www.instagram.com/boweryshowroom/', website: 'https://boweryshowroom.com/'},
         {name: 'Tia Adeola', instagram: 'https://www.instagram.com/tiaadeola/', website: null},
         {name: 'B.B. Simon', instagram: 'https://www.instagram.com/bbsimon_officialpage/', website: null},
         {name: 'Coi Leray', instagram: 'https://www.instagram.com/coileray/', website: null},
      ],
      cardColor: "#00005B",
      ticketTiers: {
         "Early Bird": {priceUSD: 35.99, available: 100, lockAddress:'0x67f8329Cf9B797fc878E8bbfe4bEd0BB6006b110' },
         "General": {priceUSD: 50.00, available: undefined, lockAddress:'0xA91c2e18d7D1a24407074Ae459914b1E933279d0'},
         "VIP": {priceUSD: 119.99, available:50,lockAddress:'0xD36561F23408E8f5e456A89258585060FBc6189b'}
      }
   },
   {
      id: 'broken-planet-popup',
      name: 'Broken Planet Pop Up ',
      date: '9/7/2023',
      startTime: '12PM',
      endTime: '8PM',
      tz: 'est',
      location: '57 Stanton St, New York, NY',
      location_url: 'https://www.google.com/maps/place/Bowery+Showroom/@40.7218684,-73.9928603,17z/data=!3m1!4b1!4m6!3m5!1s0x89c2599e567e729d:0xd4292a3e3e8ead23!8m2!3d40.7218684!4d-73.99028!16s%2Fg%2F11r9svhbxl?entry=ttu',
      venue: 'Bowery Showroom',
      venue_url:'https://boweryshowroom.com/',
      imgUrl: broken_planet,
      description: 'Created by partners Lukas Žvikas and Indrè Narbutaitė in 2015, Broken Planet Market is one of the UK’s fastest-growing streetwear brands. Inspired by outer space and American hip-hop stars, the brand champions creating garments using recycled materials and slow shipping processes to help protect the planet. Due to these sustainable business practices, the Broken Planet is a favorite among environmentally-conscious fashion lovers. The label is ultimately dedicated to redefining the very idea of a “sustainable” brand.',
      lockAddress: '0x274A5d626920337cA7FFb3458720D80bAa29D944',
      priceUSD: 0,
      email_template: 'RSVP CONFIRMATION 9/7 - Broken Planet Pop Up',
      vendors: [
         {name: 'Broken Planet', instagram: 'https://www.instagram.com/brokenplanet/', website: 'https://www.brokenplanetmarket.com/'}
      ],
      cardColor: "#6E747E"
   },
   {
      id: 'ceec-la-popup',
      name: 'CEEC. LA Pop Up, Sundae School x Highsnobiety Activation',
      date: '9/8/2023',
      startTime: '12PM',
      endTime: '8PM',
      tz: 'est',
      location: '57 Stanton St, New York, NY',
      location_url: 'https://www.google.com/maps/place/Bowery+Showroom/@40.7218684,-73.9928603,17z/data=!3m1!4b1!4m6!3m5!1s0x89c2599e567e729d:0xd4292a3e3e8ead23!8m2!3d40.7218684!4d-73.99028!16s%2Fg%2F11r9svhbxl?entry=ttu',
      venue: 'Bowery Showroom',
      venue_url:'https://boweryshowroom.com/',
      imgUrl: ceec,
      description: 'Ceec.LA is a Japanese-American inspired streetwear brand established in Los Angeles. CEEC.LA seeks to create clothing reflective of unconventional personalities amid conventional apparel culture. The brand achieves this through innovative fabric uses inspired by shared history and re-imagined vintage pieces. Sundae School will also be holding a special activation outside the showroom.',
      lockAddress: '0xe9c63e856F80aF843DBaFD5e740b7F397B049aA1',
      priceUSD: 0,
      email_template: 'RSVP CONFIRMATION 9/8 - CEEC. LA Pop Up',
      vendors: [
         {name: 'CEEC LA', instagram: 'https://www.instagram.com/ceec.la/', website: 'https://www.ceecla.com/'}
      ],
      cardColor: "#79EA4B"
   },
   {
      id: 'good-taste-popup',
      name: ' Good Taste Gift Shop Pop Up, B.B Simon Pop Up',
      date: '9/10/2023',
      startTime: '12PM',
      endTime: '8PM',
      tz: 'est',
      location: '57 Stanton St, New York, NY',
      location_url: 'https://www.google.com/maps/place/Bowery+Showroom/@40.7218684,-73.9928603,17z/data=!3m1!4b1!4m6!3m5!1s0x89c2599e567e729d:0xd4292a3e3e8ead23!8m2!3d40.7218684!4d-73.99028!16s%2Fg%2F11r9svhbxl?entry=ttu',
      venue: 'Bowery Showroom',
      venue_url:'https://boweryshowroom.com/',
      imgUrl: goodtaste,
      description: 'Good Taste Gift Shop is a New-York based, Black-owned curator of clothing and novelty items. Their unique product selection boasts everyday essentials in smart cuts, featuring durable fabrics and innovative textures. Good Taste Gift Shop truly embodies the innovative and creative spirit of New York City.',
      lockAddress: '0x4f3c3014C2A929Ace1A747cb518c10Cc4cC80514',
      priceUSD: 0,
      email_template: 'RSVP CONFIRMATION 9/10 - Good Taste & B.B. Simon',
      vendors: [
         {name: 'B.B. Simon', instagram: 'https://www.instagram.com/bbsimon_officialpage/', website: 'https://bbsimononline.com/'},
         {name: 'Good Taste', instagram: 'https://www.instagram.com/goodtastegiftshop/', website: 'https://goodtastegiftshop.com/'}
      ],
      cardColor: "#F99C64"
   },
   {
      id: 'bb-simon-popup',
      name: 'B.B. Simon Pop Up',
      date: '9/9/2023',
      startTime: '2PM',
      endTime: '7PM',
      tz: 'est',
      location: '57 Stanton St, New York, NY',
      location_url: 'https://www.google.com/maps/place/Bowery+Showroom/@40.7218684,-73.9928603,17z/data=!3m1!4b1!4m6!3m5!1s0x89c2599e567e729d:0xd4292a3e3e8ead23!8m2!3d40.7218684!4d-73.99028!16s%2Fg%2F11r9svhbxl?entry=ttu',
      venue: 'Bowery Showroom',
      venue_url:'https://boweryshowroom.com/',
      imgUrl: bb_simon,
      description: 'B.B. Simon is a Los Angeles-based brand known for known for their iconic belts that are hand-crafted, made-to-order, and embellished with Austrian crystals. B.B. Simon belts were first popularized in the early 2000s when hip-hop stars began sporting them. B.B. Simon belts have since been an iconic fixture of streetwear and hip-hop culture. Modern-day rappers such as Jack Harlow, Ice Spice, Lil Wayne, Saweetie, and Lil Uzi Vert are frequently spotted wearing custom pieces.',
      lockAddress: '0x14a133F3C1Fb484f52646FDDF4B4e8DBAc5c2118',
      priceUSD: 0,
      email_template: 'RSVP CONFIRMATION 9/9 - B.B. Simon Pop Up',
      vendors: [
         {name: 'B.B. Simon', instagram: 'https://www.instagram.com/bbsimon_officialpage/', website: 'https://bbsimononline.com/'}
      ],
      cardColor: "#C69FA8"
   }
];

export default eventsList



// .sort((a, b) => {
//    if (new Date(a.date) > new Date(b.date)) {
//       return -1
//    }
//    if (new Date(a.date) === new Date(b.date)) {
//       return 0
//    }
//    else {
//       return 1
//    }
// });
const geoDataMock = {
  lastUpdated: new Date(),
  list: [
    {
      domain: "arialase.com",
      ip: "198.71.233.1",
      country_name: "United States",
      country_code: "US",
      region_name: "Arizona",
      city: "Scottsdale",
      latitude: 33.61,
      longitude: -111.89
    },
    {
      domain: "ifconfig.se",
      ip: "45.63.115.202",
      country_name: "France",
      country_code: "FR",
      region_name: null,
      city: null,
      latitude: 48.86,
      longitude: 2.34
    },
    {
      domain: "s1.dotorie.com",
      ip: "121.134.105.106",
      country_name: "Republic of Korea",
      country_code: "KR",
      region_name: "Seoul",
      city: "Seoul",
      latitude: 37.6,
      longitude: 126.98
    },
    {
      domain: "blockchain.korea.ac.kr",
      ip: "163.152.6.10",
      country_name: "Republic of Korea",
      country_code: "KR",
      region_name: "Seoul",
      city: "Seoul",
      latitude: 37.6,
      longitude: 126.98
    },
    {
      domain: "rippled.fr",
      ip: "163.172.136.252",
      country_name: "France",
      country_code: "FR",
      region_name: null,
      city: null,
      latitude: 48.86,
      longitude: 2.34
    },
    {
      domain: "ripple.daneb.earth",
      ip: "46.38.249.187",
      country_name: "Germany",
      country_code: "DE",
      region_name: null,
      city: null,
      latitude: 51.3,
      longitude: 9.49
    },
    {
      domain: "ripple.com/build/xrp-test-net/",
      ip: "54.70.250.123",
      country_name: "United States",
      country_code: "US",
      region_name: "Oregon",
      city: "Boardman",
      latitude: 45.87,
      longitude: -119.69
    },
    {
      domain: "bitso.com",
      ip: "2400:cb00:2048:1::6814:c6f",
      country_name: "United States",
      country_code: "US",
      region_name: "North Carolina",
      city: "Columbus",
      latitude: 35.22,
      longitude: -82.07
    },
    {
      domain: "data443.com",
      ip: "35.224.139.44",
      country_name: "United States",
      country_code: "US",
      region_name: "Virginia",
      city: null,
      latitude: 38.66,
      longitude: -77.25
    },
    {
      domain: "cpxtrading.com",
      ip: "66.85.77.110",
      country_name: "United States",
      country_code: "US",
      region_name: "Missouri",
      city: "Kansas City",
      latitude: 39.11,
      longitude: -94.57
    },
    {
      domain: "ripple.nycvalidator.io",
      ip: "50.63.202.57",
      country_name: "United States",
      country_code: "US",
      region_name: "Arizona",
      city: "Scottsdale",
      latitude: 33.61,
      longitude: -111.89
    },
    {
      domain: "ripple.com",
      ip: "34.213.191.125",
      country_name: "United States",
      country_code: "US",
      region_name: "Oregon",
      city: "Boardman",
      latitude: 45.87,
      longitude: -119.69
    },
    {
      domain: "foxrp.org",
      ip: "45.55.22.252",
      country_name: "United States",
      country_code: "US",
      region_name: "California",
      city: "San Francisco",
      latitude: 37.77,
      longitude: -122.42
    },
    {
      domain: "r.sparkwired.com",
      ip: "83.217.75.68",
      country_name: "Belgium",
      country_code: "BE",
      region_name: null,
      city: null,
      latitude: 50.85,
      longitude: 4.35
    },
    {
      domain: "fr.xrpthestandard.eu",
      ip: "184.168.221.45",
      country_name: "United States",
      country_code: "US",
      region_name: "Arizona",
      city: "Scottsdale",
      latitude: 33.61,
      longitude: -111.89
    },
    {
      domain: "s2.dotorie.com",
      ip: "121.134.105.106",
      country_name: "Republic of Korea",
      country_code: "KR",
      region_name: "Seoul",
      city: "Seoul",
      latitude: 37.6,
      longitude: 126.98
    },
    {
      domain: "xrpiceland.net",
      ip: "2001:4b98:dc2:950::114",
      country_name: "France",
      country_code: "FR",
      region_name: null,
      city: null,
      latitude: 46,
      longitude: 2
    },
    {
      domain: "de.xrp.validators.network",
      ip: "209.250.233.103",
      country_name: "Germany",
      country_code: "DE",
      region_name: "Hesse",
      city: "Frankfurt am Main",
      latitude: 50.11,
      longitude: 8.71
    },
    {
      domain: "ripple.telinduscloud.lu",
      ip: "31.204.88.77",
      country_name: "Luxembourg",
      country_code: "LU",
      region_name: "Luxembourg",
      city: "Luxembourg",
      latitude: 49.61,
      longitude: 6.13
    },
    {
      domain: "xrp.rigby.me",
      ip: "159.65.0.167",
      country_name: "Singapore",
      country_code: "SG",
      region_name: "Central Singapore Community Development Council",
      city: "Singapore",
      latitude: 1.29,
      longitude: 103.86
    },
    {
      domain: "www.ripplevalidator.nl",
      ip: "85.214.123.131",
      country_name: "Germany",
      country_code: "DE",
      region_name: "Land Berlin",
      city: "Berlin",
      latitude: 52.52,
      longitude: 13.4
    },
    {
      domain: "xrp.doark.se",
      ip: "178.62.5.173",
      country_name: "United Kingdom",
      country_code: "GB",
      region_name: "England",
      city: "London",
      latitude: 51.51,
      longitude: -0.09
    },
    {
      domain: "codiusx.rehabptchoi.com",
      ip: "121.153.164.50",
      country_name: "Republic of Korea",
      country_code: "KR",
      region_name: "Daejeon",
      city: "Daejeon",
      latitude: 36.32,
      longitude: 127.42
    },
    {
      domain: "xrp.ninja",
      ip: "35.227.151.239",
      country_name: "United States",
      country_code: "US",
      region_name: "California",
      city: "Mountain View",
      latitude: 37.42,
      longitude: -122.06
    },
    {
      domain: "www.attokyo.com",
      ip: "165.100.251.216",
      country_name: "Japan",
      country_code: "JP",
      region_name: null,
      city: null,
      latitude: 35.69,
      longitude: 139.69
    },
    {
      domain: "xrpn.io",
      ip: "5.225.108.36",
      country_name: "Spain",
      country_code: "ES",
      region_name: "Navarre",
      city: "Burlata",
      latitude: 42.83,
      longitude: -1.62
    },
    {
      domain: "wietse.com",
      ip: "188.166.128.7",
      country_name: "Netherlands",
      country_code: "NL",
      region_name: "North Holland",
      city: "Amsterdam",
      latitude: 52.36,
      longitude: 4.91
    },
    {
      domain: "xrp.allchains.app",
      ip: "54.229.142.105",
      country_name: "Ireland",
      country_code: "IE",
      region_name: "Leinster",
      city: "Dublin",
      latitude: 53.33,
      longitude: -6.25
    },
    {
      domain: "rippleitin.nz",
      ip: "203.86.202.165",
      country_name: "New Zealand",
      country_code: "NZ",
      region_name: null,
      city: null,
      latitude: -41,
      longitude: 174
    },
    {
      domain: "de.xrpthestandard.eu",
      ip: "184.168.221.45",
      country_name: "United States",
      country_code: "US",
      region_name: "Arizona",
      city: "Scottsdale",
      latitude: 33.61,
      longitude: -111.89
    },
    {
      domain: "phobosnode.com",
      ip: "136.33.83.56",
      country_name: "United States",
      country_code: "US",
      region_name: "Missouri",
      city: "Kansas City",
      latitude: 39.21,
      longitude: -94.57
    },
    {
      domain: "xrp.anbc.us",
      ip: "74.208.13.147",
      country_name: "United States",
      country_code: "US",
      region_name: "Pennsylvania",
      city: "Wayne",
      latitude: 40.05,
      longitude: -75.41
    },
    {
      domain: "rabbitkick.club",
      ip: "2001:19f0:5c01:952:5400:1ff:fe35:6",
      country_name: "United States",
      country_code: "US",
      region_name: "Illinois",
      city: "Elk Grove Village",
      latitude: 42.02,
      longitude: -87.99
    },
    {
      domain: "www.bahnhof.se",
      ip: "2001:9b0:191::1",
      country_name: "Sweden",
      country_code: "SE",
      region_name: "Stockholm",
      city: "Stockholm",
      latitude: 59.33,
      longitude: 18.05
    },
    {
      domain: "validator1.worldlink-us.com",
      ip: "107.180.50.188",
      country_name: "United States",
      country_code: "US",
      region_name: "Arizona",
      city: "Scottsdale",
      latitude: 33.61,
      longitude: -111.89
    },
    {
      domain: "xrp.intellibrain.ch",
      ip: "93.104.208.204",
      country_name: "Germany",
      country_code: "DE",
      region_name: null,
      city: null,
      latitude: 51.3,
      longitude: 9.49
    },
    {
      domain: "rippled.catopsis.net",
      ip: "62.210.146.157",
      country_name: "France",
      country_code: "FR",
      region_name: null,
      city: null,
      latitude: 48.86,
      longitude: 2.34
    },
    {
      domain: "coil.com",
      ip: "2400:cb00:2048:1::6814:4285",
      country_name: "United States",
      country_code: "US",
      region_name: "North Carolina",
      city: "Columbus",
      latitude: 35.22,
      longitude: -82.07
    },
    {
      domain: "tripsite.com",
      ip: "169.53.49.84",
      country_name: "United States",
      country_code: "US",
      region_name: "Texas",
      city: "Dallas",
      latitude: 32.78,
      longitude: -96.82
    },
    {
      domain: "flagshipsolutionsgroup.com",
      ip: "70.40.212.206",
      country_name: "United States",
      country_code: "US",
      region_name: "Utah",
      city: "Provo",
      latitude: 40.22,
      longitude: -111.61
    },
    {
      domain: "xrp.peglegg.net",
      ip: "2400:cb00:2048:1::681c:c1b",
      country_name: "United States",
      country_code: "US",
      region_name: "North Carolina",
      city: "Columbus",
      latitude: 35.22,
      longitude: -82.07
    },
    {
      domain: "bithomp.com",
      ip: "138.201.86.22",
      country_name: "Germany",
      country_code: "DE",
      region_name: null,
      city: null,
      latitude: 51.3,
      longitude: 9.49
    },
    {
      domain: "validator.xrptipbot.com",
      ip: "2400:cb00:2048:1::681f:4cb1",
      country_name: "United States",
      country_code: "US",
      region_name: "North Carolina",
      city: "Columbus",
      latitude: 35.22,
      longitude: -82.07
    },
    {
      domain: "brex.io",
      ip: "213.208.154.37",
      country_name: "Austria",
      country_code: "AT",
      region_name: null,
      city: null,
      latitude: 48.2,
      longitude: 16.37
    },
    {
      domain: "brainraid.com",
      ip: "162.243.105.109",
      country_name: "United States",
      country_code: "US",
      region_name: "New York",
      city: "New York",
      latitude: 40.75,
      longitude: -74
    },
    {
      domain: "validator.mcardle.rs",
      ip: "77.46.217.250",
      country_name: "Serbia",
      country_code: "RS",
      region_name: "Belgrade",
      city: "Belgrade",
      latitude: 44.82,
      longitude: 20.47
    },
    {
      domain: "ripple1.swissvon.ch",
      ip: "46.20.241.178",
      country_name: "Switzerland",
      country_code: "CH",
      region_name: "Geneva",
      city: "Geneva",
      latitude: 46.2,
      longitude: 6.15
    },
    {
      domain: "cinnapple.fun",
      ip: "108.160.136.20",
      country_name: "Japan",
      country_code: "JP",
      region_name: "Tokyo",
      city: "Heiwajima",
      latitude: 35.58,
      longitude: 139.75
    },
    {
      domain: "rippled.boldcoins.com.br",
      ip: "206.189.255.191",
      country_name: "United States",
      country_code: "US",
      region_name: "New York",
      city: "New York",
      latitude: 40.72,
      longitude: -74.01
    },
    {
      domain: "codius.dadadollar.com",
      ip: "158.140.254.192",
      country_name: "Australia",
      country_code: "AU",
      region_name: "Victoria",
      city: "Melbourne",
      latitude: -37.88,
      longitude: 145.07
    },
    {
      domain: "seow.cloud",
      ip: "158.140.207.138",
      country_name: "Australia",
      country_code: "AU",
      region_name: "Victoria",
      city: "Dandenong",
      latitude: -37.98,
      longitude: 145.2
    },
    {
      domain: "node.xrpthestandard.eu",
      ip: "184.168.221.40",
      country_name: "United States",
      country_code: "US",
      region_name: "Arizona",
      city: "Scottsdale",
      latitude: 33.61,
      longitude: -111.89
    },
    {
      domain: "9grid.fr",
      ip: "2a01:4f8:120:11c2::6:1",
      country_name: "Germany",
      country_code: "DE",
      region_name: "Bavaria",
      city: "Nuremberg",
      latitude: 49.45,
      longitude: 11.07
    },
    {
      domain: "validator1.ripplexrp.network",
      ip: "209.182.233.220",
      country_name: "United States",
      country_code: "US",
      region_name: "Texas",
      city: "Dallas",
      latitude: 32.78,
      longitude: -96.82
    },
    {
      domain: "xrpvalidate.com",
      ip: "188.166.128.7",
      country_name: "Netherlands",
      country_code: "NL",
      region_name: "North Holland",
      city: "Amsterdam",
      latitude: 52.36,
      longitude: 4.91
    },
    {
      domain: "rippled.xrpthestandard.ch",
      ip: "178.128.200.156",
      country_name: "Greece",
      country_code: "GR",
      region_name: null,
      city: null,
      latitude: 37.97,
      longitude: 23.72
    },
    {
      domain: "kickstart.alexcobbvalidatingtransactions.xyz",
      latitude: null,
      longitude: null
    },
    {
      domain: "rippled.aussiexrp.info",
      ip: "206.189.211.211",
      country_name: "United States",
      country_code: "US",
      region_name: "California",
      city: "Santa Clara",
      latitude: 37.35,
      longitude: -121.99
    },
    {
      domain: "ripple.dizerpro.io",
      ip: "50.63.202.52",
      country_name: "United States",
      country_code: "US",
      region_name: "Arizona",
      city: "Scottsdale",
      latitude: 33.61,
      longitude: -111.89
    },
    {
      domain: "xrpvalidator.kingbluexrp.com",
      ip: "108.167.181.55",
      country_name: "United States",
      country_code: "US",
      region_name: "Texas",
      city: "Houston",
      latitude: 29.83,
      longitude: -95.47
    },
    { domain: "mtdew.scheetz.rocks", latitude: null, longitude: null },
    {
      domain: "xrp.codius.space",
      ip: "184.168.221.62",
      country_name: "United States",
      country_code: "US",
      region_name: "Arizona",
      city: "Scottsdale",
      latitude: 33.61,
      longitude: -111.89
    },
    {
      domain: "validator01.xrppartner.com",
      ip: "50.63.202.35",
      country_name: "United States",
      country_code: "US",
      region_name: "Arizona",
      city: "Scottsdale",
      latitude: 33.61,
      longitude: -111.89
    },
    {
      domain: "ripple2.swissvon.ch",
      ip: "46.20.241.178",
      country_name: "Switzerland",
      country_code: "CH",
      region_name: "Geneva",
      city: "Geneva",
      latitude: 46.2,
      longitude: 6.15
    },
    {
      domain: "xrp.barri.club",
      ip: "93.189.4.38",
      country_name: "United Kingdom",
      country_code: "GB",
      region_name: null,
      city: null,
      latitude: 51.5,
      longitude: -0.12
    },
    {
      domain: "ripple.xrpcode.io",
      ip: "184.168.221.45",
      country_name: "United States",
      country_code: "US",
      region_name: "Arizona",
      city: "Scottsdale",
      latitude: 33.61,
      longitude: -111.89
    },
    {
      domain: "tmack-xrpvalidator.btmack.org",
      ip: "138.197.185.121",
      country_name: "Canada",
      country_code: "CA",
      region_name: "Ontario",
      city: "Toronto",
      latitude: 43.67,
      longitude: -79.42
    },
    {
      domain: "codius01.honeymonster11.co.uk",
      ip: "50.63.202.51",
      country_name: "United States",
      country_code: "US",
      region_name: "Arizona",
      city: "Scottsdale",
      latitude: 33.61,
      longitude: -111.89
    },
    {
      domain: "ipayinstant.com",
      ip: "13.229.38.153",
      country_name: "Singapore",
      country_code: "SG",
      region_name: "Central Singapore Community Development Council",
      city: "Singapore",
      latitude: 1.29,
      longitude: 103.86
    },
    {
      domain: "xrp-france.eu",
      ip: "37.97.84.156",
      country_name: "France",
      country_code: "FR",
      region_name: "Île-de-France",
      city: "Paris",
      latitude: 48.86,
      longitude: 2.33
    },
    {
      domain: "cyboxygen.world",
      ip: "165.227.147.44",
      country_name: "United States",
      country_code: "US",
      region_name: "New York",
      city: "New York",
      latitude: 40.72,
      longitude: -74.01
    },
    {
      domain: "ripple.phraust.com",
      ip: "205.186.183.118",
      country_name: "United States",
      country_code: "US",
      region_name: "California",
      city: "Culver City",
      latitude: 34.02,
      longitude: -118.39
    },
    {
      domain: "xrp2.fiatsense.com",
      ip: "184.168.131.241",
      country_name: "United States",
      country_code: "US",
      region_name: "Arizona",
      city: "Scottsdale",
      latitude: 33.61,
      longitude: -111.89
    },
    {
      domain: "www.cryptoseeker.net",
      ip: "50.87.249.26",
      country_name: "United States",
      country_code: "US",
      region_name: "Utah",
      city: "Orem",
      latitude: 40.3,
      longitude: -111.68
    },
    { domain: "xrp-10.scheetz.club", latitude: null, longitude: null },
    { domain: "xrp-04.scheetz.club", latitude: null, longitude: null },
    { domain: "xrp.scheetz.rocks", latitude: null, longitude: null },
    {
      domain: "zapster.io",
      ip: "51.140.44.224",
      country_name: "United Kingdom",
      country_code: "GB",
      region_name: "England",
      city: "London",
      latitude: 51.51,
      longitude: -0.09
    },
    {
      domain: "certic.info",
      ip: "31.193.170.5",
      country_name: "United Kingdom",
      country_code: "GB",
      region_name: null,
      city: null,
      latitude: 51.5,
      longitude: -0.12
    },
    {
      domain: "r1ppled.com",
      ip: "188.68.52.82",
      country_name: "Germany",
      country_code: "DE",
      region_name: null,
      city: null,
      latitude: 51.3,
      longitude: 9.49
    }
  ]
};

export { geoDataMock };

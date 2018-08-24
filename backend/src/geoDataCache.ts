const geoDataMock = {
  lastUpdated: new Date(),
  list: [
    {
      domain: "ripple.dizerpro.io",
      ip: "159.203.74.73",
      country_name: "United States",
      country_code: "US",
      region_name: "Florida",
      city: "Pahokee",
      latitude: 26.86,
      longitude: -80.64
    },
    {
      domain: "xrpvalidator.kingbluexrp.com",
      ip: "159.65.78.247",
      country_name: "United States",
      country_code: "US",
      region_name: "California",
      city: "Huntington Park",
      latitude: 33.98,
      longitude: -118.21
    },
    {
      domain: "xrp.codius.space",
      ip: "206.81.12.208",
      country_name: "United States",
      country_code: "US",
      region_name: "New Jersey",
      city: "North Bergen",
      latitude: 40.79,
      longitude: -74.02
    },
    {
      domain: "validator01.xrppartner.com",
      ip: "178.128.70.122",
      country_name: "United States",
      country_code: "US",
      region_name: "California",
      city: "San Francisco",
      latitude: 37.77,
      longitude: -122.42
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
      domain: "s2.dotorie.com",
      ip: "61.74.211.23",
      country_name: "Republic of Korea",
      country_code: "KR",
      region_name: "Seoul",
      city: null,
      latitude: 37.5,
      longitude: 127.06
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
      domain: "www.bahnhof.se",
      ip: "213.136.63.73",
      country_name: "Sweden",
      country_code: "SE",
      region_name: "Stockholm",
      city: "Solna",
      latitude: 59.37,
      longitude: 18.02
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
      domain: "blockchain.korea.ac.kr",
      ip: "163.152.127.125",
      country_name: "Republic of Korea",
      country_code: "KR",
      region_name: "Seoul",
      city: "Seoul",
      latitude: 37.6,
      longitude: 126.98
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
      domain: "validator.xrptipbot.com",
      ip: "104.31.76.177",
      country_name: "United States",
      country_code: "US",
      region_name: null,
      city: null,
      latitude: 37.75,
      longitude: -97.82
    },
    {
      domain: "de.xrpthestandard.eu",
      ip: "173.249.31.77",
      country_name: "Germany",
      country_code: "DE",
      region_name: null,
      city: null,
      latitude: 51.3,
      longitude: 9.49
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
      domain: "xrp.doark.se",
      ip: "165.227.146.227",
      country_name: "United States",
      country_code: "US",
      region_name: "New York",
      city: "New York",
      latitude: 40.72,
      longitude: -74.01
    },
    {
      domain: "xrp.intellibrain.ch",
      ip: "46.101.249.4",
      country_name: "Germany",
      country_code: "DE",
      region_name: "Hesse",
      city: "Frankfurt am Main",
      latitude: 50.12,
      longitude: 8.68
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
      domain: "coil.com",
      ip: "104.20.66.133",
      country_name: "United States",
      country_code: "US",
      region_name: null,
      city: null,
      latitude: 37.75,
      longitude: -97.82
    },
    {
      domain: "xrp.allchains.app",
      ip: "206.189.241.137",
      country_name: "Netherlands",
      country_code: "NL",
      region_name: "North Holland",
      city: "Amsterdam",
      latitude: 52.36,
      longitude: 4.91
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
      domain: "validator1.worldlink-us.com",
      ip: "47.90.214.85",
      country_name: "United States",
      country_code: "US",
      region_name: "California",
      city: "San Mateo",
      latitude: 37.53,
      longitude: -122.36
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
      domain: "xrpiceland.net",
      ip: "217.70.186.114",
      country_name: "France",
      country_code: "FR",
      region_name: null,
      city: null,
      latitude: 48.86,
      longitude: 2.34
    },
    {
      domain: "rabbitkick.club",
      ip: "45.63.70.192",
      country_name: "United States",
      country_code: "US",
      region_name: "Illinois",
      city: "Elk Grove Village",
      latitude: 42.02,
      longitude: -87.99
    },
    {
      domain: "ripple.nycvalidator.io",
      ip: "206.81.11.51",
      country_name: "United States",
      country_code: "US",
      region_name: "New Jersey",
      city: "North Bergen",
      latitude: 40.79,
      longitude: -74.02
    },
    {
      domain: "r.sparkwired.com",
      ip: "35.204.160.56",
      country_name: null,
      country_code: null,
      region_name: null,
      city: null,
      latitude: 47,
      longitude: 8
    },
    {
      domain: "bitso.com",
      ip: "104.20.11.111",
      country_name: "United States",
      country_code: "US",
      region_name: null,
      city: null,
      latitude: 37.75,
      longitude: -97.82
    },
    {
      domain: "xrp.peglegg.net",
      ip: "104.28.12.27",
      country_name: "United States",
      country_code: "US",
      region_name: null,
      city: null,
      latitude: 37.75,
      longitude: -97.82
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
      domain: "ripple1.swissvon.ch",
      ip: "46.20.241.180",
      country_name: "Switzerland",
      country_code: "CH",
      region_name: "Geneva",
      city: "Geneva",
      latitude: 46.2,
      longitude: 6.15
    },
    {
      domain: "rippled.boldcoins.com.br",
      ip: "206.189.226.5",
      country_name: "United States",
      country_code: "US",
      region_name: "New York",
      city: "New York",
      latitude: 40.71,
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
      domain: "9grid.fr",
      ip: "148.251.74.45",
      country_name: "Germany",
      country_code: "DE",
      region_name: null,
      city: null,
      latitude: 51.3,
      longitude: 9.49
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
      domain: "rippled.aussiexrp.info",
      ip: "178.128.29.110",
      country_name: "Greece",
      country_code: "GR",
      region_name: "Attica",
      city: "Athens",
      latitude: 37.98,
      longitude: 23.73
    }
  ]
};

export { geoDataMock };

import { QueryList, SupportedCharts } from "../../types";

export default <QueryList>[
  [
    {
      title: "Main Net Validators",
      type: SupportedCharts.Table,
      query: {
        dimensions: [
          "ValidatorsWithGeo.domain",
          "ValidatorsWithGeo.chain",
          "ValidatorsWithGeo.ripple",
          "ValidatorsWithGeo.unlHost",
          "ValidatorsWithGeo.validation_public_key",
          "ValidatorsWithGeo.agreement24h",
          "ValidatorsWithGeo.agreement24hMissed",
          "ValidatorsWithGeo.lastUpdatedInHours",
          "ValidatorsWithGeo.countryName"
        ],
        filters: [
          {
            dimension: "ValidatorsWithGeo.chain",
            operator: "notEquals",
            values: ["altnet"]
          }
        ]
      },
      options: {
        rowKey: "ValidatorsWithGeo.validation_public_key",
        scroll: { x: 1000 },
        buildStats: (data: any[]) => {
          const total = data.length;
          let defaultUnl = 0;
          let ripple = 0;
          const countries: any = {};
          data.forEach(c => {
            defaultUnl +=
              c["ValidatorsWithGeo.unlHost"] === "vl.ripple.com" ? 1 : 0;
            ripple += c["ValidatorsWithGeo.ripple"] === "Ripple" ? 1 : 0;
            if (c["ValidatorsWithGeo.countryName"]) {
              countries[c["ValidatorsWithGeo.countryName"]] = 1;
            }
          });
          const defaultUnlRate = total === 0 ? 0 : defaultUnl / total;
          const dominance = total === 0 ? 0 : ripple / total;
          return [
            {
              title: "Validators",
              value: total
            },
            {
              title: "Countries",
              value: Object.keys(countries).length
            },
            {
              title: "In Default UNL",
              value: defaultUnl,
              suffix: `(${(defaultUnlRate * 100).toFixed(0)}%)`
            },
            {
              title: "Ripple Share",
              value: ripple,
              suffix: `(${(dominance * 100).toFixed(0)}%)`
            }
          ];
        },
        columns: [
          {
            title: "Domain",
            dataIndex: "ValidatorsWithGeo.domain",
            key: "ValidatorsWithGeo.domain",
            enableFilter: true
          },
          {
            title: "Location",
            dataIndex: "ValidatorsWithGeo.countryName",
            key: "ValidatorsWithGeo.countryName",
            enableFilter: true
          },
          {
            title: "UNLs",
            dataIndex: "ValidatorsWithGeo.unlHost",
            key: "ValidatorsWithGeo.unlHost",
            enableFilter: true
          },
          {
            title: "Chain",
            dataIndex: "ValidatorsWithGeo.chain",
            key: "ValidatorsWithGeo.chain",
            enableFilter: true
          },
          {
            title: "Agreement (24h)",
            dataIndex: "ValidatorsWithGeo.agreement24h",
            key: "ValidatorsWithGeo.agreement24h"
          },
          {
            title: "Missed (24h)",
            dataIndex: "ValidatorsWithGeo.agreement24hMissed",
            key: "ValidatorsWithGeo.agreement24hMissed"
          },
          {
            title: "Last Seen (UTC)",
            dataIndex: "ValidatorsWithGeo.lastUpdatedInHours",
            key: "ValidatorsWithGeo.lastUpdatedInHours",
            type: "shortdate",
            format: "YYYY-MM-DD HH:mm"
          },
          {
            title: "Key",
            dataIndex: "ValidatorsWithGeo.validation_public_key",
            key: "ValidatorsWithGeo.validation_public_key",
            type: "key"
          }
        ]
      }
    }
  ]
];

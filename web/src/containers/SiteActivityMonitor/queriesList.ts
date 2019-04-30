import { QueryList, SupportedCharts } from "../../types";

export default <QueryList>[
  [
    {
      title: "Main Net Validators",
      type: SupportedCharts.Table,
      query: {
        dimensions: [
          "MainNetValidators.domain",
          "MainNetValidators.chain",
          "MainNetValidators.ripple",
          "MainNetValidators.unlHost",
          "MainNetValidators.validation_public_key",
          "MainNetValidators.agreement24h",
          "MainNetValidators.agreement24hMissed"
        ]
      },
      options: {
        rowKey: "MainNetValidators.validation_public_key",
        scroll: { x: 1000 },
        buildStats: (data: any[]) => {
          const total = data.length;
          let defaultUnl = 0;
          let ripple = 0;
          data.forEach(c => {
            defaultUnl +=
              c["MainNetValidators.unlHost"] === "ripple.com" ? 1 : 0;
            ripple += c["MainNetValidators.ripple"] === "Ripple" ? 1 : 0;
          });
          const defaultUnlRate = total === 0 ? 0 : defaultUnl / total;
          const dominance = total === 0 ? 0 : ripple / total;
          return [
            {
              title: "Total",
              value: total
            },
            {
              title: "In Default UNL",
              value: defaultUnl,
              suffix: `(${(defaultUnlRate * 100).toFixed(0)}%)`
            },
            {
              title: "Ripple",
              value: ripple,
              suffix: `(${(dominance * 100).toFixed(0)}%)`
            }
          ];
        },
        columns: [
          {
            title: "Domain",
            dataIndex: "MainNetValidators.domain",
            key: "MainNetValidators.domain",
            enableFilter: true
          },
          {
            title: "UNL Publishers",
            dataIndex: "MainNetValidators.unlHost",
            key: "MainNetValidators.unlHost",
            enableFilter: true
          },
          {
            title: "Chain",
            dataIndex: "MainNetValidators.chain",
            key: "MainNetValidators.chain",
            enableFilter: true
          },
          {
            title: "Agreement (24h)",
            dataIndex: "MainNetValidators.agreement24h",
            key: "MainNetValidators.agreement24h"
          },
          {
            title: "Missed (24h)",
            dataIndex: "MainNetValidators.agreement24hMissed",
            key: "MainNetValidators.agreement24hMissed"
          },
          {
            title: "Key",
            dataIndex: "MainNetValidators.validation_public_key",
            key: "MainNetValidators.validation_public_key"
          }
        ]
      }
    }
  ]
];

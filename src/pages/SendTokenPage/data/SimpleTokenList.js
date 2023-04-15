const Chainlist = [
  // {
  //   chainId: 1, // Ethereum Mainnet
  //   tokenList: [
  //     {
  //       chainId: 1,
  //       name: "Ethereum",
  //       address: "undefined",
  //       decimals: 6,
  //       symbol: "ETH",
  //       logoURI: "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png",
  //     },
  //     {
  //       chainId: 1,
  //       name: "USD Coin",
  //       address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
  //       decimals: 6,
  //       symbol: "USDC",
  //       logoURI: "https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png",
  //     },
  //     {
  //       chainId: 1,
  //       name: "Tether",
  //       address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
  //       decimals: 18,
  //       symbol: "USDT",
  //       logoURI: "https://s2.coinmarketcap.com/static/img/coins/64x64/825.png",
  //     },
  //   ],
  // },
  {
    chainId: 137, // Polygon Mainnet
    tokenList: [
      {
        chainId: 1,
        name: "Polygon",
        address: "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
        decimals: 18,
        symbol: "MATIC",
        logoURI: "https://s2.coinmarketcap.com/static/img/coins/64x64/3890.png",
      },
      {
        chainId: 1,
        name: "USD Coin",
        address: "0x07865c6E87B9F70255377e024ace6630C1Eaa37F", // uniswap usd coin
        // address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
        decimals: 6,
        symbol: "USDC",
        logoURI: "https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png",
      },
      {
        chainId: 1,
        name: "Tether",
        address: "0xC2C527C0CACF457746Bd31B2a698Fe89de2b6d49", //uniswap usdt
        // address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
        decimals: 18,
        symbol: "USDT",
        logoURI: "https://s2.coinmarketcap.com/static/img/coins/64x64/825.png",
      },
    ],
  },
  {
    chainId: 5, // Ethereum Testnet Goerli
    tokenList: [
      {
        chainId: 1,
        name: "Goerli",
        // address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
        decimals: 6,
        symbol: "GoerliETH",
        logoURI: "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png",
      },
      {
        chainId: 1,
        name: "USD Coin",
        // address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
        // address: "0xD87Ba7A50B2E7E660f678A895E4B72E7CB4CCd9C", // uniswap usd coin usdc
        address: "0x07865c6E87B9F70255377e024ace6630C1Eaa37F", // uniswap usd coin
        decimals: 6,
        symbol: "USDC",
        logoURI: "https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png",
      },
      {
        chainId: 1,
        name: "Tether",
        address: "0xC2C527C0CACF457746Bd31B2a698Fe89de2b6d49", //uniswap usdt
        // address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
        // decimals: 18,
        decimals: 6,
        symbol: "USDT",
        logoURI: "https://s2.coinmarketcap.com/static/img/coins/64x64/825.png",
      },
      {
        name: "DAI",
        symbol: "DAI",
        logoURI: "https://s2.coinmarketcap.com/static/img/coins/64x64/4943.png",
      },
      {
        name: "Wrapped Bitcoin",
        symbol: "WBTC",
        logoURI: "https://s2.coinmarketcap.com/static/img/coins/64x64/3717.png",
      },
    ],
  },
];

export default Chainlist;

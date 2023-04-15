function activate() {
  try {
    var _this4 = this;
    var _temp5 = function _temp5() {
      function _temp2() {
        var account;
        return Promise.resolve(
          new Promise(function (resolve, reject) {
            var userReject = function userReject() {
              // Erase the provider manually
              _this4.walletConnectProvider = undefined;
              reject(new UserRejectedRequestError());
            }; // Workaround to bubble up the error when user reject the connection
            _this4.walletConnectProvider.connector.on(
              "disconnect",
              function () {
                // Check provider has not been enabled to prevent this event callback from being called in the future
                if (!account) {
                  userReject();
                }
              }
            );
            _this4.walletConnectProvider
              .enable()
              .then(function (accounts) {
                return resolve(accounts[0]);
              })
              ["catch"](function (error) {
                // TODO ideally this would be a better check
                if (error.message === "User closed modal") {
                  userReject();
                  return;
                }
                reject(error);
              });
          })["catch"](function (err) {
            throw err;
          })
        ).then(function (_Promise$catch) {
          account = _Promise$catch;
          _this4.walletConnectProvider.on(
            "disconnect",
            _this4.handleDisconnect
          );
          _this4.walletConnectProvider.on(
            "chainChanged",
            _this4.handleChainChanged
          );
          _this4.walletConnectProvider.on(
            "accountsChanged",
            _this4.handleAccountsChanged
          );
          return { provider: _this4.walletConnectProvider, account: account };
        });
      }
      var _temp = (function () {
        if (!_this4.walletConnectProvider.connector.connected) {
          return Promise.resolve(
            _this4.walletConnectProvider.connector.createSession(
              _this4.config.chainId
                ? { chainId: _this4.config.chainId }
                : undefined
            )
          ).then(function () {
            _this4.emit(
              URI_AVAILABLE,
              _this4.walletConnectProvider.connector.uri
            );
          });
        }
      })();
      // ensure that the uri is going to be available, and emit an event if there's a new uri
      return _temp && _temp.then ? _temp.then(_temp2) : _temp2(_temp);
    };
    var _temp6 = (function () {
      if (!_this4.walletConnectProvider) {
        return Promise.resolve(
          Promise.all(
            /*! import() */ [
              __webpack_require__.e(
                "vendors-node_modules_walletconnect_ethereum-provider_dist_esm_index_js"
              ),
              __webpack_require__.e("_a449"),
            ]
          )
            .then(
              __webpack_require__.bind(
                __webpack_require__,
                /*! @walletconnect/ethereum-provider */ "./node_modules/@walletconnect/ethereum-provider/dist/esm/index.js"
              )
            )
            .then(function (m) {
              var _m$default;
              return (_m$default = m == null ? void 0 : m["default"]) != null
                ? _m$default
                : m;
            })
        ).then(function (WalletConnectProvider) {
          _this4.walletConnectProvider = new WalletConnectProvider(
            _this4.config
          );
        });
      }
    })();
    return Promise.resolve(
      _temp6 && _temp6.then ? _temp6.then(_temp5) : _temp5(_temp6)
    );
  } catch (e) {
    return Promise.reject(e);
  }
}

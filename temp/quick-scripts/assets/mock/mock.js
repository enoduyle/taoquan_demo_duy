(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/mock/mock.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '7b3eaHRoJpAl7VdbWi2xxG7', 'mock', __filename);
// mock/mock.js

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var userList = ['', '56e6b7cb-533c-4888-9d5a-ab248a06697c', 'd24bb892-2186-4f99-80bf-d86711182e1e', 'dc539325-654e-4e8b-868f-76de25a2f35a', '7f40784b-5a46-4543-8423-fd8f4fcd0279', 'ca23696a-6aff-49e4-8be4-2878a4537265', '2d7fe03b-9e6f-46c2-bd1c-5a62c8d5e047', 'dc8cc0bb-7f25-4284-bbe0-a78d1f5b0f10', '1323b14d-b986-40ae-bc38-1e4362f5f339', '665e2d1b-85a8-486c-951f-4ba6b4a520e2', 'efe80f93-c21d-414b-b6b0-ca6633624b52', 'd2341c95-cc7a-4764-b076-54778df11c58', '7fdfd544-d0f8-4d1c-8f62-5c56857e6fae', 'bb8d1526-f4c0-472c-8308-b6b23dcd6a51', 'aea847a9-9b40-4f27-8f04-b821152d9d95', '122b2b5e-6232-49ac-8c23-5f7f0087a2f5', '5037ff8b-6a53-4812-b961-79984425ec04', 'e88b0830-0de9-4e3b-ae16-29c261cd797a', '3cb48324-b4fe-443a-bb72-94365dfba446', '7d186fb7-9dbc-416f-92f7-098e2b387b41', 'e6d94531-b9a7-4613-a369-88be17c47510', 'bbf5c484-fd49-4712-a74a-d9087fcac470', 'c0fea303-40d9-4916-9469-bb120c9cb946', '7d68da4c-e6f2-4b2e-a062-b42c70d1262f', '1f1d69a8-4de4-4ecf-8038-175c259a1796', '26c969e0-8ca8-4938-964b-5974a22e726f', '708574af-82aa-4dc2-a1ca-d545a45b9406', 'f1e65656-7a7f-4470-a42f-d3f329558882', 'a623678e-3c01-4970-a154-973c4f83b554', '47bc3d24-7c00-49ca-b18a-ae97368b2eab', '1ee89c7f-43d7-4d0f-a07f-35617d832db6', '4b5a50dd-8518-41a7-81a1-ae08634f7224', 'd2cefdae-62e3-4998-9629-ea6ced1b6d37', 'a7e128e6-deff-425d-9c42-a9f7ed32dbe4', '02e7e890-f5e7-46d1-bfb3-664cb80d6014', '0621ed1b-d2b5-480a-bee0-0fa93b72590f', '86e8c8c1-c8ad-495a-a5d6-efcebb93abc6', '68e5ef10-5451-455b-9076-871907548752', '1d05a7b7-fef3-49ad-820d-13cc26dab10c', 'be11c11b-0f04-4827-bf3d-82af3c75dc20', '7f58dd54-8e9f-4fed-b91e-c2657255bc39', '280125a5-92d3-492c-9054-ad163e48b441', '76d73797-4249-429d-8006-5d47cee5f6cb', '6487d34e-9e63-4bbe-8556-2ed6de713d9d', '48c64e13-1310-4a39-b258-1c1417fc486a', '1d231f82-4fc6-47e2-bba4-c203419f8402', 'e9eff152-dcbb-4d85-bc9f-953ae4d12776', '93437ca0-d5a9-446d-9e2d-eb0833c2acc1', 'af67b4e7-eabc-4087-b66a-b8b1bd0a5e00', 'fb3ebe48-caf1-4acc-b4c5-5e12b6126eb8', '0d786d1d-4f1c-46a3-8ffb-54cf80e14d79', 'ce851e2b-8e5e-46bd-8a13-b3d487c7ed6d', 'b890aa8c-ab4b-4b66-8094-d5fa1ce76abd', '56d73399-4231-42b8-bb9e-75ea8c5bdc35', 'b4412364-c3bc-4fa3-9311-1e1a721dd7bd', '30cc4fae-ac36-4eff-884a-7f51812129d0', '8e4cbb6e-72bf-4e79-bb85-eb9ef13bcb82', '2820fb3c-ca83-488b-b4eb-60a462d3940e', 'ddad2b48-8004-4d06-9749-2159e39a502b', 'e2bbb4f7-3987-49b7-9ca9-5e0ed8619f5f', 'a2c21e4f-1cf1-4c08-bd48-23fbafb0193c', 'd8235853-20e5-4c59-a6ec-51b5f920c83d', '5eff7099-0ab5-4218-9e29-ad62a4a7aef6', '8b965686-b37e-4c66-b463-5c7bb61c0be0', 'a85c17e3-6b22-4609-8a5a-9b839bbf27aa', 'd717803c-45aa-4676-b40f-cd8bcb2dfbd3', '7599abed-b608-41c6-a14f-40b94c65ae89', '43b60a97-22f4-4536-b2a7-fd1025df9bc5', '7b1ec585-5323-43b2-80c0-98961fbe7c4d', 'fbd35472-3c35-4764-a5db-39c30483dfb1', '7f5dbeef-cf0d-4715-b730-61548ad8c8b8', '34485d01-c565-4208-921f-c1c07f4b651c', 'b6cf22b0-5c58-4f5d-a5a8-142d431483af', 'a23a5459-1f08-4f0a-821f-0d7bab70aee9', '2d7c1dca-f628-4214-9fe9-c461e5a61774', '775e18f7-f702-471d-847b-e6e1be2dc465', '5ea33124-81a7-4c6c-8a29-67977e4af089', '53a0a688-2d7f-48d8-a8aa-2f83cf339fb4', '5614804e-b27a-4cc2-9317-3c37a2ff4a10', 'f4650e0a-8eae-4c77-8388-a74b24d38deb', 'e25416f1-8c8d-450b-919b-faa97981fe8d', '45e8195b-9ff1-466d-9748-3e1280443dd4', 'da0af4d3-af6b-4af1-977a-34a9e779dca6', 'f5b4323b-37a9-49f2-a4c0-7443515b6443', '360f4086-fc1b-41cf-b322-18ac80ff1636', 'bf0246e7-a179-4a62-843a-5f12036cafd4', '1bdff444-a214-424d-b76f-2c4b75c45c7c', '30e3d2ff-2f05-447b-972d-16571031eb26', 'c2d77d20-f6b3-4e71-bb5e-a7fb8c3e57b4', 'ba8977a8-b8b2-4f27-9c1c-64c68eb4972e', '23459e80-6190-47ab-8639-9cec204fc1ff', '8dbf465d-74b4-480d-af06-11baceadac1a', '0bf53ba8-efab-492a-93bc-086a74f263e6', 'a1560658-5927-4d2b-8bd7-0854f5e04689', '43253665-e9c8-43fa-b8b1-e70b9aa84cbc', '60beb533-fcf9-4927-b89e-884328a4ecfb', '6951de0d-cddc-46a4-abde-3bb44cce0dec', 'd09428f0-c851-4f17-af76-f0c6845e39bb', 'def15344-d560-4434-8a6b-f49274bedb28', '5335474d-cf1a-4acc-8fc0-757bd1bffc37', 'e9cca118-6bbd-4569-b0fb-2134bb75a922'];

var listToken = ['', 'acb80c1b66e8d7e0238f664f6b2bade2', 'b64ee5942930d546d542b901f59571f8', '2ae5ce8fd3c2443ed9ed03d636870a5c', '5de60fa78df3c8b0d74fdab50bb1f05e', 'ec6418535a9a8c91c51457d95712d4ca', '62894b6a26ab2fc237bf8d337e09bea1', '4844f2fd92183d1e51db69d2262fdf62', '120c1f3746720186db019889e858fe76', '0e68f050850a67c4a4895969b8267ac5', '933529699ea607139e924b07e4ee3bdb', 'f14065e80d3c0c0da8e3231ae6a9e090', 'ca8222f4c8c3289bb6fbaf81720e7718', 'ceb383b6a9b06acb776dd2705345d592', 'bc229dcb0f2f526889046c4cc47ab8a2', '84d5399826046dbd4a06a5f53b15fed4', '64b7587d15c9440dfa9b8027719330eb', '254fd4b630e0554608623c61d4cee589', '9233c0694d2050eacf0cc48e1d92bbcc', '0d84f49e245969c0f075a304f61e7020', 'bee2816e5284e5f443c9bdaaa3b1d01d'];
//  const uIndex = 30;
var mock = exports.mock = {
    // IS_MOCK_NETWORK: true,
    '9999': 'spinNoWin',
    '9998': 'spinMiniGame',
    '5999': 'spinWin',
    userList: userList,
    listToken: listToken,
    token: 'CQFYIm.RPD5pXGNK2kvxGyu9Cr11lry',
    userText: 'user180',
    pwText: 'pwduser180',
    userId: 'user180'
};

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=mock.js.map
        
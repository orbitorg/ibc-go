"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[9505],{32978:(e,n,o)=>{o.r(n),o.d(n,{assets:()=>l,contentTitle:()=>r,default:()=>h,frontMatter:()=>s,metadata:()=>a,toc:()=>c});var t=o(85893),i=o(11151);const s={title:"IBC-Go v2 to v3",sidebar_label:"IBC-Go v2 to v3",sidebar_position:4,slug:"/migrations/v2-to-v3"},r="Migrating from ibc-go v2 to v3",a={id:"migrations/v2-to-v3",title:"IBC-Go v2 to v3",description:"This document is intended to highlight significant changes which may require more information than presented in the CHANGELOG.",source:"@site/versioned_docs/version-v5.4.x/04-migrations/04-v2-to-v3.md",sourceDirName:"04-migrations",slug:"/migrations/v2-to-v3",permalink:"/v5/migrations/v2-to-v3",draft:!1,unlisted:!1,tags:[],version:"v5.4.x",sidebarPosition:4,frontMatter:{title:"IBC-Go v2 to v3",sidebar_label:"IBC-Go v2 to v3",sidebar_position:4,slug:"/migrations/v2-to-v3"},sidebar:"defaultSidebar",previous:{title:"IBC-Go v1 to v2",permalink:"/v5/migrations/v1-to-v2"},next:{title:"IBC-Go v3 to v4",permalink:"/v5/migrations/v3-to-v4"}},l={},c=[{value:"Chains",id:"chains",level:2},{value:"ICS20",id:"ics20",level:3},{value:"ICS27",id:"ics27",level:3},{value:"Upgrade Proposal",id:"upgrade-proposal",level:3},{value:"Add <code>StoreUpgrades</code> for ICS27 module",id:"add-storeupgrades-for-ics27-module",level:4},{value:"Genesis migrations",id:"genesis-migrations",level:3},{value:"Ante decorator",id:"ante-decorator",level:3},{value:"IBC Apps",id:"ibc-apps",level:2},{value:"<code>OnChanOpenTry</code> must return negotiated application version",id:"onchanopentry-must-return-negotiated-application-version",level:3},{value:"<code>OnChanOpenAck</code> will take additional <code>counterpartyChannelID</code> argument",id:"onchanopenack-will-take-additional-counterpartychannelid-argument",level:3},{value:"<code>NegotiateAppVersion</code> removed from <code>IBCModule</code> interface",id:"negotiateappversion-removed-from-ibcmodule-interface",level:3},{value:"Channel state will not be set before application callback",id:"channel-state-will-not-be-set-before-application-callback",level:3},{value:"IBC application callbacks moved from <code>AppModule</code> to <code>IBCModule</code>",id:"ibc-application-callbacks-moved-from-appmodule-to-ibcmodule",level:3},{value:"IBC testing package",id:"ibc-testing-package",level:3},{value:"Relayers",id:"relayers",level:2},{value:"IBC Light Clients",id:"ibc-light-clients",level:2}];function d(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h1,{id:"migrating-from-ibc-go-v2-to-v3",children:"Migrating from ibc-go v2 to v3"}),"\n",(0,t.jsx)(n.p,{children:"This document is intended to highlight significant changes which may require more information than presented in the CHANGELOG.\nAny changes that must be done by a user of ibc-go should be documented here."}),"\n",(0,t.jsx)(n.p,{children:"There are four sections based on the four potential user groups of this document:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Chains"}),"\n",(0,t.jsx)(n.li,{children:"IBC Apps"}),"\n",(0,t.jsx)(n.li,{children:"Relayers"}),"\n",(0,t.jsx)(n.li,{children:"IBC Light Clients"}),"\n"]}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"Note:"})," ibc-go supports golang semantic versioning and therefore all imports must be updated to bump the version number on major releases."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-go",children:"github.com/cosmos/ibc-go/v2 -> github.com/cosmos/ibc-go/v3\n"})}),"\n",(0,t.jsx)(n.p,{children:"No genesis or in-place migrations are required when upgrading from v1 or v2 of ibc-go."}),"\n",(0,t.jsx)(n.h2,{id:"chains",children:"Chains"}),"\n",(0,t.jsx)(n.h3,{id:"ics20",children:"ICS20"}),"\n",(0,t.jsxs)(n.p,{children:["The ",(0,t.jsx)(n.code,{children:"transferkeeper.NewKeeper(...)"})," now takes in an ICS4Wrapper.\nThe ICS4Wrapper should be the IBC Channel Keeper unless ICS 20 is being connected to a middleware application."]}),"\n",(0,t.jsx)(n.h3,{id:"ics27",children:"ICS27"}),"\n",(0,t.jsxs)(n.p,{children:["ICS27 Interchain Accounts has been added as a supported IBC application of ibc-go.\nPlease see the ",(0,t.jsx)(n.a,{href:"/v5/apps/interchain-accounts/overview",children:"ICS27 documentation"})," for more information."]}),"\n",(0,t.jsx)(n.h3,{id:"upgrade-proposal",children:"Upgrade Proposal"}),"\n",(0,t.jsxs)(n.p,{children:["If the chain will adopt ICS27, it must set the appropriate params during the execution of the upgrade handler in ",(0,t.jsx)(n.code,{children:"app.go"}),":"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-go",children:'app.UpgradeKeeper.SetUpgradeHandler("v3",\n    func(ctx sdk.Context, _ upgradetypes.Plan, fromVM module.VersionMap) (module.VersionMap, error) {\n        // set the ICS27 consensus version so InitGenesis is not run\n        fromVM[icatypes.ModuleName] = icamodule.ConsensusVersion()\n        \n        // create ICS27 Controller submodule params\n        controllerParams := icacontrollertypes.Params{\n            ControllerEnabled: true, \n        }\n\n        // create ICS27 Host submodule params\n        hostParams := icahosttypes.Params{\n            HostEnabled: true, \n            AllowMessages: []string{"/cosmos.bank.v1beta1.MsgSend", ...}, \n        }\n        \n        // initialize ICS27 module\n        icamodule.InitModule(ctx, controllerParams, hostParams)\n        \n        ...\n\n        return app.mm.RunMigrations(ctx, app.configurator, fromVM)\n    })\n\n'})}),"\n",(0,t.jsxs)(n.p,{children:["The host and controller submodule params only need to be set if the chain integrates those submodules.\nFor example, if a chain chooses not to integrate a controller submodule, it may pass empty params into ",(0,t.jsx)(n.code,{children:"InitModule"}),"."]}),"\n",(0,t.jsxs)(n.h4,{id:"add-storeupgrades-for-ics27-module",children:["Add ",(0,t.jsx)(n.code,{children:"StoreUpgrades"})," for ICS27 module"]}),"\n",(0,t.jsxs)(n.p,{children:["For ICS27 it is also necessary to ",(0,t.jsx)(n.a,{href:"https://docs.cosmos.network/main/learn/advanced/upgrade#add-storeupgrades-for-new-modules",children:"manually add store upgrades"})," for the new ICS27 module and then configure the store loader to apply those upgrades in ",(0,t.jsx)(n.code,{children:"app.go"}),":"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-go",children:'if upgradeInfo.Name == "v3" && !app.UpgradeKeeper.IsSkipHeight(upgradeInfo.Height) {\n    storeUpgrades := store.StoreUpgrades{\n        Added: []string{icacontrollertypes.StoreKey, icahosttypes.StoreKey},\n    }\n\n    app.SetStoreLoader(upgradetypes.UpgradeStoreLoader(upgradeInfo.Height, &storeUpgrades))\n}\n'})}),"\n",(0,t.jsxs)(n.p,{children:["This ensures that the new module's stores are added to the multistore before the migrations begin.\nThe host and controller submodule keys only need to be added if the chain integrates those submodules.\nFor example, if a chain chooses not to integrate a controller submodule, it does not need to add the controller key to the ",(0,t.jsx)(n.code,{children:"Added"})," field."]}),"\n",(0,t.jsx)(n.h3,{id:"genesis-migrations",children:"Genesis migrations"}),"\n",(0,t.jsx)(n.p,{children:"If the chain will adopt ICS27 and chooses to upgrade via a genesis export, then the ICS27 parameters must be set during genesis migration."}),"\n",(0,t.jsx)(n.p,{children:"The migration code required may look like:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-go",children:'    controllerGenesisState := icatypes.DefaultControllerGenesis()\n    // overwrite parameters as desired\n    controllerGenesisState.Params = icacontrollertypes.Params{\n        ControllerEnabled: true, \n    } \n\n    hostGenesisState := icatypes.DefaultHostGenesis()\n    // overwrite parameters as desired\n    hostGenesisState.Params = icahosttypes.Params{\n        HostEnabled: true, \n        AllowMessages: []string{"/cosmos.bank.v1beta1.MsgSend", ...}, \n    }\n\n    icaGenesisState := icatypes.NewGenesisState(controllerGenesisState, hostGenesisState)\n\n    // set new ics27 genesis state\n    appState[icatypes.ModuleName] = clientCtx.Codec.MustMarshalJSON(icaGenesisState)\n'})}),"\n",(0,t.jsx)(n.h3,{id:"ante-decorator",children:"Ante decorator"}),"\n",(0,t.jsxs)(n.p,{children:["The field of type ",(0,t.jsx)(n.code,{children:"channelkeeper.Keeper"})," in the ",(0,t.jsx)(n.code,{children:"AnteDecorator"})," structure has been replaced with a field of type ",(0,t.jsx)(n.code,{children:"*keeper.Keeper"}),":"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-diff",children:"type AnteDecorator struct {\n-    k channelkeeper.Keeper\n+    k *keeper.Keeper\n}\n\n- func NewAnteDecorator(k channelkeeper.Keeper) AnteDecorator {\n+ func NewAnteDecorator(k *keeper.Keeper) AnteDecorator {\n    return AnteDecorator{k: k}\n}\n"})}),"\n",(0,t.jsx)(n.h2,{id:"ibc-apps",children:"IBC Apps"}),"\n",(0,t.jsxs)(n.h3,{id:"onchanopentry-must-return-negotiated-application-version",children:[(0,t.jsx)(n.code,{children:"OnChanOpenTry"})," must return negotiated application version"]}),"\n",(0,t.jsxs)(n.p,{children:["The ",(0,t.jsx)(n.code,{children:"OnChanOpenTry"})," application callback has been modified.\nThe return signature now includes the application version.\nIBC applications must perform application version negotiation in ",(0,t.jsx)(n.code,{children:"OnChanOpenTry"})," using the counterparty version.\nThe negotiated application version then must be returned in ",(0,t.jsx)(n.code,{children:"OnChanOpenTry"})," to core IBC.\nCore IBC will set this version in the TRYOPEN channel."]}),"\n",(0,t.jsxs)(n.h3,{id:"onchanopenack-will-take-additional-counterpartychannelid-argument",children:[(0,t.jsx)(n.code,{children:"OnChanOpenAck"})," will take additional ",(0,t.jsx)(n.code,{children:"counterpartyChannelID"})," argument"]}),"\n",(0,t.jsxs)(n.p,{children:["The ",(0,t.jsx)(n.code,{children:"OnChanOpenAck"})," application callback has been modified.\nThe arguments now include the counterparty channel id."]}),"\n",(0,t.jsxs)(n.h3,{id:"negotiateappversion-removed-from-ibcmodule-interface",children:[(0,t.jsx)(n.code,{children:"NegotiateAppVersion"})," removed from ",(0,t.jsx)(n.code,{children:"IBCModule"})," interface"]}),"\n",(0,t.jsxs)(n.p,{children:["Previously this logic was handled by the ",(0,t.jsx)(n.code,{children:"NegotiateAppVersion"})," function.\nRelayers would query this function before calling ",(0,t.jsx)(n.code,{children:"ChanOpenTry"}),".\nApplications would then need to verify that the passed in version was correct.\nNow applications will perform this version negotiation during the channel handshake, thus removing the need for ",(0,t.jsx)(n.code,{children:"NegotiateAppVersion"}),"."]}),"\n",(0,t.jsx)(n.h3,{id:"channel-state-will-not-be-set-before-application-callback",children:"Channel state will not be set before application callback"}),"\n",(0,t.jsx)(n.p,{children:"The channel handshake logic has been reorganized within core IBC.\nChannel state will not be set in state after the application callback is performed.\nApplications must rely only on the passed in channel parameters instead of querying the channel keeper for channel state."}),"\n",(0,t.jsxs)(n.h3,{id:"ibc-application-callbacks-moved-from-appmodule-to-ibcmodule",children:["IBC application callbacks moved from ",(0,t.jsx)(n.code,{children:"AppModule"})," to ",(0,t.jsx)(n.code,{children:"IBCModule"})]}),"\n",(0,t.jsxs)(n.p,{children:["Previously, IBC module callbacks were apart of the ",(0,t.jsx)(n.code,{children:"AppModule"})," type.\nThe recommended approach is to create an ",(0,t.jsx)(n.code,{children:"IBCModule"})," type and move the IBC module callbacks from ",(0,t.jsx)(n.code,{children:"AppModule"})," to ",(0,t.jsx)(n.code,{children:"IBCModule"})," in a separate file ",(0,t.jsx)(n.code,{children:"ibc_module.go"}),"."]}),"\n",(0,t.jsxs)(n.p,{children:["The mock module go API has been broken in this release by applying the above format.\nThe IBC module callbacks have been moved from the mock modules ",(0,t.jsx)(n.code,{children:"AppModule"})," into a new type ",(0,t.jsx)(n.code,{children:"IBCModule"}),"."]}),"\n",(0,t.jsxs)(n.p,{children:["As apart of this release, the mock module now supports middleware testing. Please see the ",(0,t.jsx)(n.a,{href:"https://github.com/cosmos/ibc-go/blob/v5.3.0/testing/README.md#middleware-testing",children:"README"})," for more information."]}),"\n",(0,t.jsxs)(n.p,{children:["Please review the ",(0,t.jsx)(n.a,{href:"https://github.com/cosmos/ibc-go/blob/v5.3.0/testing/mock/ibc_module.go",children:"mock"})," and ",(0,t.jsx)(n.a,{href:"https://github.com/cosmos/ibc-go/blob/v5.3.0/modules/apps/transfer/ibc_module.go",children:"transfer"})," modules as examples. Additionally, ",(0,t.jsx)(n.a,{href:"https://github.com/cosmos/ibc-go/blob/v5.3.0/testing/simapp/app.go",children:"simapp"})," provides an example of how ",(0,t.jsx)(n.code,{children:"IBCModule"})," types should now be added to the IBC router in favour of ",(0,t.jsx)(n.code,{children:"AppModule"}),"."]}),"\n",(0,t.jsx)(n.h3,{id:"ibc-testing-package",children:"IBC testing package"}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.code,{children:"TestChain"}),"s are now created with chainID's beginning from an index of 1. Any calls to ",(0,t.jsx)(n.code,{children:"GetChainID(0)"})," will now fail. Please increment all calls to ",(0,t.jsx)(n.code,{children:"GetChainID"})," by 1."]}),"\n",(0,t.jsx)(n.h2,{id:"relayers",children:"Relayers"}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.code,{children:"AppVersion"})," gRPC has been removed.\nThe ",(0,t.jsx)(n.code,{children:"version"})," string in ",(0,t.jsx)(n.code,{children:"MsgChanOpenTry"})," has been deprecated and will be ignored by core IBC.\nRelayers no longer need to determine the version to use on the ",(0,t.jsx)(n.code,{children:"ChanOpenTry"})," step.\nIBC applications will determine the correct version using the counterparty version."]}),"\n",(0,t.jsx)(n.h2,{id:"ibc-light-clients",children:"IBC Light Clients"}),"\n",(0,t.jsxs)(n.p,{children:["The ",(0,t.jsx)(n.code,{children:"GetProofSpecs"})," function has been removed from the ",(0,t.jsx)(n.code,{children:"ClientState"})," interface. This function was previously unused by core IBC. Light clients which don't use this function may remove it."]})]})}function h(e={}){const{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},11151:(e,n,o)=>{o.d(n,{Z:()=>a,a:()=>r});var t=o(67294);const i={},s=t.createContext(i);function r(e){const n=t.useContext(s);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:r(e.components),t.createElement(s.Provider,{value:n},e.children)}}}]);
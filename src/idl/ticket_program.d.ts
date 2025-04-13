import { Idl } from '@coral-xyz/anchor';

declare const idl: Idl & {
  version: string;
  name: string;
  instructions: [
    {
      name: "registerUser";
      accounts: [
        {
          name: "userProfile";
          isMut: true;
          isSigner: false;
        },
        {
          name: "authority";
          isMut: true;
          isSigner: true;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "username";
          type: "string";
        }
      ];
    }
  ];
  accounts: [
    {
      name: "UserProfile";
      type: {
        kind: "struct";
        fields: [
          {
            name: "wallet";
            type: "publicKey";
          },
          {
            name: "username";
            type: "string";
          },
          {
            name: "tickets";
            type: {
              vec: "publicKey";
            };
          }
        ];
      };
    }
  ];
  metadata: {
    address: string;
  };
};

export default idl; 
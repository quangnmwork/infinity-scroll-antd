
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: "http://localhost:4000",
  documents: ["src/**/*.tsx","!src/generated/graphql.tsx"],
  generates: {
    "src/gql/graphql.ts": {
      plugins: ['typescript','typescript-operations', 'typescript-react-apollo'],
      config: {
        withHooks: true
      },
    },
  },  emitLegacyCommonJSImports: false,
  ignoreNoDocuments: true,
  config: {
    namingConvention: "keep",
  },  
};

export default config;


/* https://github.com/zalmoxisus/redux-devtools-extension/issues/492 */

import * as redux from "redux"

declare module "redux" {
    export type GenericStoreEnhancer = any
}

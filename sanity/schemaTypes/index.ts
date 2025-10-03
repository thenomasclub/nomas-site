import { type SchemaTypeDefinition } from "sanity"

import article from "./article"
import partner from "./partner"

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    article,
    partner,
  ],
}
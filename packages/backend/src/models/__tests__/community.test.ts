/*
 * CS3099 Group A3
 */

import test from "ava";
import { Community } from "../community";

test("toJSON", t => {
  const community = new Community();
  community.id = "someid";
  community.title = "Some title";
  community.description = "Some description";
  t.deepEqual(community.toJSON(), {
    id: "someid",
    title: "Some title",
    description: "Some description",
    admins: []
  })
})

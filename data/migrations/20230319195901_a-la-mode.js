exports.up = function (knex) {
    return knex.schema
      .createTable("user", (tbl) => {
        tbl.increments();
        tbl.string("email", 128).notNullable();
        tbl.string("name", 128).notNullable();
        tbl.string("password", 128).notNullable();
      })
      .createTable("user_item", (tbl) => {
        tbl
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("user");
        tbl.increments();
        tbl.string("image").notNullable();
        tbl.string("title", 128).notNullable();
        tbl.boolean("favorite").defaultTo(false);
        tbl.string("notes", 255);
        tbl.string("type", 128).notNullable();
        tbl.string("color", 50).notNullable();
        tbl.string("size", 20);
        tbl.string("link", 128);
        tbl.string("style", 50);
        
      })
  };
  
  exports.down = function (knex) {
    return knex.schema
      .dropTableIfExists("user")
      .dropTableIfExists("user_item")
  };
  


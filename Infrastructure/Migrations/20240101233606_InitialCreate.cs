using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DeliveryMethods",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    ShortName = table.Column<string>(type: "TEXT", nullable: true),
                    DeliveryTime = table.Column<string>(type: "TEXT", nullable: true),
                    Description = table.Column<string>(type: "TEXT", nullable: true),
                    Price = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DeliveryMethods", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ProductComposers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    LastName = table.Column<string>(type: "TEXT", nullable: true),
                    FirstName = table.Column<string>(type: "TEXT", nullable: true),
                    Dates = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductComposers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Title = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    LongTitle = table.Column<string>(type: "TEXT", maxLength: 180, nullable: false),
                    Instrumentation = table.Column<string>(type: "TEXT", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Editor = table.Column<string>(type: "TEXT", maxLength: 180, nullable: false),
                    PictureUrl1 = table.Column<string>(type: "TEXT", nullable: false),
                    PictureUrl2 = table.Column<string>(type: "TEXT", nullable: true),
                    PictureUrl3 = table.Column<string>(type: "TEXT", nullable: true),
                    PictureUrl4 = table.Column<string>(type: "TEXT", nullable: true),
                    PictureUrl5 = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ProductTypes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Orders",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false),
                    BuyerEmail = table.Column<string>(type: "TEXT", nullable: true),
                    OrderDate = table.Column<DateTime>(type: "TEXT", nullable: false),
                    ShipToAddress_FirstName = table.Column<string>(type: "TEXT", nullable: true),
                    ShipToAddress_LastName = table.Column<string>(type: "TEXT", nullable: true),
                    ShipToAddress_Street = table.Column<string>(type: "TEXT", nullable: true),
                    ShipToAddress_City = table.Column<string>(type: "TEXT", nullable: true),
                    ShipToAddress_Zipcode = table.Column<string>(type: "TEXT", nullable: true),
                    ShipToAddress_Country = table.Column<string>(type: "TEXT", nullable: true),
                    DeliveryMethodId = table.Column<int>(type: "INTEGER", nullable: true),
                    Subtotal = table.Column<decimal>(type: "TEXT", nullable: false),
                    Status = table.Column<string>(type: "TEXT", nullable: false),
                    PaymentIntentId = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Orders", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Orders_DeliveryMethods_DeliveryMethodId",
                        column: x => x.DeliveryMethodId,
                        principalTable: "DeliveryMethods",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "ProductProductComposer",
                columns: table => new
                {
                    ProductComposersId = table.Column<int>(type: "INTEGER", nullable: false),
                    ProductsId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductProductComposer", x => new { x.ProductComposersId, x.ProductsId });
                    table.ForeignKey(
                        name: "FK_ProductProductComposer_ProductComposers_ProductComposersId",
                        column: x => x.ProductComposersId,
                        principalTable: "ProductComposers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProductProductComposer_Products_ProductsId",
                        column: x => x.ProductsId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProductProductType",
                columns: table => new
                {
                    ProductTypesId = table.Column<int>(type: "INTEGER", nullable: false),
                    ProductsId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductProductType", x => new { x.ProductTypesId, x.ProductsId });
                    table.ForeignKey(
                        name: "FK_ProductProductType_ProductTypes_ProductTypesId",
                        column: x => x.ProductTypesId,
                        principalTable: "ProductTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProductProductType_Products_ProductsId",
                        column: x => x.ProductsId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OrderItems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    ItemOrdered_ProductItemId = table.Column<int>(type: "INTEGER", nullable: true),
                    ItemOrdered_ProductName = table.Column<string>(type: "TEXT", nullable: true),
                    ItemOrdered_PictureUrl = table.Column<string>(type: "TEXT", nullable: true),
                    Price = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Quantity = table.Column<int>(type: "INTEGER", nullable: false),
                    OrderId = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OrderItems_Orders_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Orders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_OrderItems_OrderId",
                table: "OrderItems",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_DeliveryMethodId",
                table: "Orders",
                column: "DeliveryMethodId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductProductComposer_ProductsId",
                table: "ProductProductComposer",
                column: "ProductsId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductProductType_ProductsId",
                table: "ProductProductType",
                column: "ProductsId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OrderItems");

            migrationBuilder.DropTable(
                name: "ProductProductComposer");

            migrationBuilder.DropTable(
                name: "ProductProductType");

            migrationBuilder.DropTable(
                name: "Orders");

            migrationBuilder.DropTable(
                name: "ProductComposers");

            migrationBuilder.DropTable(
                name: "ProductTypes");

            migrationBuilder.DropTable(
                name: "Products");

            migrationBuilder.DropTable(
                name: "DeliveryMethods");
        }
    }
}

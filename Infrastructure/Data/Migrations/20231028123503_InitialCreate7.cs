using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate7 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PictureUrls",
                table: "Products");

            migrationBuilder.AddColumn<string>(
                name: "PictureUrl1",
                table: "Products",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "PictureUrl2",
                table: "Products",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "PictureUrl3",
                table: "Products",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "PictureUrl4",
                table: "Products",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "PictureUrl5",
                table: "Products",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PictureUrl1",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "PictureUrl2",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "PictureUrl3",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "PictureUrl4",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "PictureUrl5",
                table: "Products");

            migrationBuilder.AddColumn<string>(
                name: "PictureUrls",
                table: "Products",
                type: "TEXT",
                nullable: true);
        }
    }
}

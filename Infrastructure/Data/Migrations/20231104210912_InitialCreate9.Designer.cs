﻿// <auto-generated />
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Infrastructure.Data.Migrations
{
    [DbContext(typeof(StoreContext))]
    [Migration("20231104210912_InitialCreate9")]
    partial class InitialCreate9
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "7.0.12");

            modelBuilder.Entity("Core.Entities.Product", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Instrumentation")
                        .HasColumnType("TEXT");

                    b.Property<string>("LongTitle")
                        .HasColumnType("TEXT");

                    b.Property<string>("PictureUrl1")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("PictureUrl2")
                        .HasColumnType("TEXT");

                    b.Property<string>("PictureUrl3")
                        .HasColumnType("TEXT");

                    b.Property<string>("PictureUrl4")
                        .HasColumnType("TEXT");

                    b.Property<string>("PictureUrl5")
                        .HasColumnType("TEXT");

                    b.Property<decimal>("Price")
                        .HasColumnType("TEXT");

                    b.Property<string>("Title")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Products");
                });

            modelBuilder.Entity("Core.Entities.ProductComposer", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Dates")
                        .HasColumnType("TEXT");

                    b.Property<string>("FirstName")
                        .HasColumnType("TEXT");

                    b.Property<string>("LastName")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("ProductComposers");
                });

            modelBuilder.Entity("Core.Entities.ProductType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("ProductTypes");
                });

            modelBuilder.Entity("ProductProductComposer", b =>
                {
                    b.Property<int>("ProductComposersId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("ProductsId")
                        .HasColumnType("INTEGER");

                    b.HasKey("ProductComposersId", "ProductsId");

                    b.HasIndex("ProductsId");

                    b.ToTable("ProductProductComposer", (string)null);
                });

            modelBuilder.Entity("ProductProductType", b =>
                {
                    b.Property<int>("ProductTypesId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("ProductsId")
                        .HasColumnType("INTEGER");

                    b.HasKey("ProductTypesId", "ProductsId");

                    b.HasIndex("ProductsId");

                    b.ToTable("ProductProductType", (string)null);
                });

            modelBuilder.Entity("ProductProductComposer", b =>
                {
                    b.HasOne("Core.Entities.ProductComposer", null)
                        .WithMany()
                        .HasForeignKey("ProductComposersId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Core.Entities.Product", null)
                        .WithMany()
                        .HasForeignKey("ProductsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("ProductProductType", b =>
                {
                    b.HasOne("Core.Entities.ProductType", null)
                        .WithMany()
                        .HasForeignKey("ProductTypesId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Core.Entities.Product", null)
                        .WithMany()
                        .HasForeignKey("ProductsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}

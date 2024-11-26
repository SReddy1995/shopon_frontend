import React from 'react';
import OrderStatusChart from './charts/OrderStatusChart';
import BuyerFeeChart from './charts/BuyerFeeChart';
import ProductSyncChart from './charts/ProductSyncChart';
import TransactionalAnalysis from './charts/TransactionalAnalysis';
import CartAbandonedRate from './charts/CartAbandonedRate';
import CancellationAnalysis from './charts/CancellationAnalysis';

const Dashboard = () => {

    const BuyerFeeChartType = 'line'
    const OrderStatusChartType = 'line'
    const ProductsSyncChartType = 'line'
    const TxnAnalysisChartType = 'line'
    const CancellationAnalysisChartType = 'line'

const ordersData = [
  // Original Data (January - April)
//   { date: '2024-01-01', totalOrders: 50, successfulOrders: 45, canceledOrders: 3, deliveredOrders: 42 },
//   { date: '2024-01-02', totalOrders: 60, successfulOrders: 55, canceledOrders: 2, deliveredOrders: 53 },
//   { date: '2024-01-03', totalOrders: 65, successfulOrders: 60, canceledOrders: 3, deliveredOrders: 58 },
//   { date: '2024-01-04', totalOrders: 70, successfulOrders: 65, canceledOrders: 4, deliveredOrders: 62 },
//   { date: '2024-01-05', totalOrders: 80, successfulOrders: 75, canceledOrders: 2, deliveredOrders: 72 },
//   { date: '2024-01-06', totalOrders: 85, successfulOrders: 80, canceledOrders: 4, deliveredOrders: 78 },
//   { date: '2024-01-07', totalOrders: 90, successfulOrders: 85, canceledOrders: 3, deliveredOrders: 82 },
//   { date: '2024-02-01', totalOrders: 50, successfulOrders: 45, canceledOrders: 5, deliveredOrders: 40 },
//   { date: '2024-02-02', totalOrders: 60, successfulOrders: 55, canceledOrders: 4, deliveredOrders: 52 },
//   { date: '2024-02-03', totalOrders: 65, successfulOrders: 60, canceledOrders: 4, deliveredOrders: 55 },
//   { date: '2024-02-04', totalOrders: 70, successfulOrders: 68, canceledOrders: 1, deliveredOrders: 67 },
//   { date: '2024-02-05', totalOrders: 80, successfulOrders: 77, canceledOrders: 3, deliveredOrders: 75 },
//   { date: '2024-02-06', totalOrders: 85, successfulOrders: 80, canceledOrders: 5, deliveredOrders: 77 },
//   { date: '2024-02-07', totalOrders: 90, successfulOrders: 85, canceledOrders: 3, deliveredOrders: 80 },
//   { date: '2024-03-01', totalOrders: 75, successfulOrders: 70, canceledOrders: 4, deliveredOrders: 65 },
//   { date: '2024-03-02', totalOrders: 105, successfulOrders: 100, canceledOrders: 5, deliveredOrders: 95 },
//   { date: '2024-03-03', totalOrders: 90, successfulOrders: 85, canceledOrders: 4, deliveredOrders: 80 },
//   { date: '2024-03-04', totalOrders: 95, successfulOrders: 90, canceledOrders: 3, deliveredOrders: 85 },
//   { date: '2024-03-05', totalOrders: 100, successfulOrders: 95, canceledOrders: 2, deliveredOrders: 92 },
//   { date: '2024-03-06', totalOrders: 105, successfulOrders: 100, canceledOrders: 4, deliveredOrders: 95 },
//   { date: '2024-03-07', totalOrders: 110, successfulOrders: 105, canceledOrders: 3, deliveredOrders: 100 },
  { date: '2024-04-01', totalOrders: 100, successfulOrders: 95, canceledOrders: 2, deliveredOrders: 92 },
  { date: '2024-04-02', totalOrders: 110, successfulOrders: 100, canceledOrders: 4, deliveredOrders: 98 },
  { date: '2024-04-03', totalOrders: 115, successfulOrders: 110, canceledOrders: 3, deliveredOrders: 105 },
  { date: '2024-04-04', totalOrders: 120, successfulOrders: 115, canceledOrders: 2, deliveredOrders: 110 },
  { date: '2024-04-05', totalOrders: 125, successfulOrders: 120, canceledOrders: 3, deliveredOrders: 115 },
  { date: '2024-04-06', totalOrders: 130, successfulOrders: 125, canceledOrders: 2, deliveredOrders: 120 },
  { date: '2024-04-07', totalOrders: 450, successfulOrders: 450, canceledOrders: 3, deliveredOrders: 440 },

  // May to November 2024 - Generated Data
  { date: '2024-05-01', totalOrders: 140, successfulOrders: 135, canceledOrders: 3, deliveredOrders: 130 },
  { date: '2024-05-02', totalOrders: 145, successfulOrders: 140, canceledOrders: 4, deliveredOrders: 135 },
  { date: '2024-05-03', totalOrders: 150, successfulOrders: 145, canceledOrders: 4, deliveredOrders: 140 },
  { date: '2024-05-04', totalOrders: 155, successfulOrders: 150, canceledOrders: 3, deliveredOrders: 145 },
  { date: '2024-05-05', totalOrders: 160, successfulOrders: 155, canceledOrders: 4, deliveredOrders: 150 },
  { date: '2024-05-06', totalOrders: 165, successfulOrders: 160, canceledOrders: 3, deliveredOrders: 155 },
  { date: '2024-05-07', totalOrders: 170, successfulOrders: 165, canceledOrders: 4, deliveredOrders: 160 },
  
  // Continue similarly for other months till November
  { date: '2024-06-01', totalOrders: 800, successfulOrders: 800, canceledOrders: 4, deliveredOrders: 750 },
  { date: '2024-06-02', totalOrders: 175, successfulOrders: 170, canceledOrders: 5, deliveredOrders: 165 },
  { date: '2024-06-03', totalOrders: 350, successfulOrders: 300, canceledOrders: 4, deliveredOrders: 200 },
//   { date: '2024-06-04', totalOrders: 185, successfulOrders: 180, canceledOrders: 3, deliveredOrders: 175 },
//   { date: '2024-06-05', totalOrders: 190, successfulOrders: 185, canceledOrders: 5, deliveredOrders: 180 },

  { date: '2024-07-01', totalOrders: 500, successfulOrders: 455, canceledOrders: 4, deliveredOrders: 455 },
  { date: '2024-07-02', totalOrders: 410, successfulOrders: 405, canceledOrders: 5, deliveredOrders: 400 },

  { date: '2024-08-01', totalOrders: 855, successfulOrders: 855, canceledOrders: 5, deliveredOrders: 850 },

  { date: '2024-09-01', totalOrders: 1000, successfulOrders: 900, canceledOrders: 5, deliveredOrders: 850 },

  { date: '2024-10-01', totalOrders: 1500, successfulOrders: 1150, canceledOrders: 5, deliveredOrders: 1200 },

  { date: '2024-11-01', totalOrders: 1200, successfulOrders: 1050, canceledOrders: 5, deliveredOrders: 1000 },
];

// const productSyncData = [
//     // Original Data (January - April)
//     { date: '2024-01-01', grocery: 50, fashion: 30 },
//     { date: '2024-01-02', grocery: 60, health: 25 },
//     { date: '2024-01-03', fashion: 40, health: 30 },
//     { date: '2024-01-04', grocery: 80, fashion: 45 },
//     { date: '2024-01-05', grocery: 90, health: 40 },
//     { date: '2024-01-06', fashion: 55, health: 45 },
//     { date: '2024-01-07', grocery: 50, fashion: 60, health: 50 },
//     { date: '2024-02-01', grocery: 50, fashion: 30 },
//     { date: '2024-02-02', grocery: 60, health: 25 },
//     { date: '2024-02-03', fashion: 40, health: 30 },
//     { date: '2024-02-04', grocery: 80, fashion: 45 },
//     { date: '2024-02-05', grocery: 90, health: 40 },
//     { date: '2024-02-06', fashion: 55, health: 45 },
//     { date: '2024-02-07', grocery: 60, fashion: 60, health: 50 },

// ]
const productSyncData = [
    // Generated Data (May - November 2024)
{ date: '2024-05-01', grocery: 70, fashion: 50, health: 35 },
{ date: '2024-05-02', grocery: 75, fashion: 55, health: 40 },
{ date: '2024-05-03', grocery: 80, fashion: 60, health: 45 },
{ date: '2024-05-04', grocery: 85, fashion: 65, health: 50 },
{ date: '2024-05-05', grocery: 90, fashion: 70, health: 55 },
{ date: '2024-05-06', grocery: 95, fashion: 75, health: 60 },
{ date: '2024-05-07', grocery: 100, fashion: 80, health: 65 },

{ date: '2024-06-01', grocery: 110, fashion: 90, health: 75 },
{ date: '2024-06-02', grocery: 115, fashion: 95, health: 80 },
{ date: '2024-06-03', grocery: 120, fashion: 100, health: 85 },
{ date: '2024-06-04', grocery: 125, fashion: 105, health: 90 },
{ date: '2024-06-05', grocery: 130, fashion: 110, health: 95 },
{ date: '2024-06-06', grocery: 135, fashion: 115, health: 100 },
{ date: '2024-06-07', grocery: 140, fashion: 120, health: 105 },

{ date: '2024-07-01', grocery: 150, fashion: 130, health: 115 },
{ date: '2024-07-02', grocery: 155, fashion: 135, health: 120 },
{ date: '2024-07-03', grocery: 160, fashion: 140, health: 125 },
{ date: '2024-07-04', grocery: 165, fashion: 145, health: 130 },
{ date: '2024-07-05', grocery: 170, fashion: 150, health: 135 },
{ date: '2024-07-06', grocery: 175, fashion: 155, health: 140 },
{ date: '2024-07-07', grocery: 180, fashion: 160, health: 145 },

{ date: '2024-08-01', grocery: 190, fashion: 170, health: 155 },
{ date: '2024-08-02', grocery: 195, fashion: 175, health: 160 },
{ date: '2024-08-03', grocery: 200, fashion: 180, health: 165 },
{ date: '2024-08-04', grocery: 205, fashion: 185, health: 170 },
{ date: '2024-08-05', grocery: 210, fashion: 190, health: 175 },
{ date: '2024-08-06', grocery: 215, fashion: 195, health: 180 },
{ date: '2024-08-07', grocery: 220, fashion: 200, health: 185 },

{ date: '2024-09-01', grocery: 230, fashion: 210, health: 195 },
{ date: '2024-09-02', grocery: 235, fashion: 215, health: 200 },
{ date: '2024-09-03', grocery: 240, fashion: 220, health: 205 },
{ date: '2024-09-04', grocery: 245, fashion: 225, health: 210 },
{ date: '2024-09-05', grocery: 250, fashion: 230, health: 215 },
{ date: '2024-09-06', grocery: 255, fashion: 235, health: 220 },
{ date: '2024-09-07', grocery: 260, fashion: 240, health: 225 },

{ date: '2024-10-01', grocery: 270, fashion: 250, health: 235 },
{ date: '2024-10-02', grocery: 275, fashion: 255, health: 240 },
{ date: '2024-10-03', grocery: 280, fashion: 260, health: 245 },
{ date: '2024-10-04', grocery: 285, fashion: 265, health: 250 },
{ date: '2024-10-05', grocery: 290, fashion: 270, health: 255 },
{ date: '2024-10-06', grocery: 295, fashion: 275, health: 260 },
{ date: '2024-10-07', grocery: 300, fashion: 280, health: 265 },

{ date: '2024-11-01', grocery: 310, fashion: 290, health: 275 },
{ date: '2024-11-02', grocery: 315, fashion: 295, health: 280 },
{ date: '2024-11-03', grocery: 320, fashion: 300, health: 285 },
{ date: '2024-11-04', grocery: 325, fashion: 305, health: 290 },
{ date: '2024-11-05', grocery: 330, fashion: 310, health: 295 },
{ date: '2024-11-06', grocery: 335, fashion: 315, health: 300 },
{ date: '2024-11-07', grocery: 340, fashion: 320, health: 305 },
]

const cancellationAnalysisData = [
{ date: '2024-05-01', grocery: 7, fashion: 5, health: 3 },
{ date: '2024-05-02', grocery: 5, fashion: 5, health: 0 },
{ date: '2024-05-03', grocery: 0, fashion: 0, health: 5 },
{ date: '2024-05-04', grocery: 5, fashion: 5, health: 0 },
{ date: '2024-05-05', grocery: 0, fashion: 7, health: 5 },
{ date: '2024-05-06', grocery: 5, fashion: 5, health: 0 },
{ date: '2024-05-07', grocery: 1, fashion: 8, health: 5 },

{ date: '2024-06-01', grocery: 10, fashion: 9, health: 5 },
{ date: '2024-06-02', grocery: 1, fashion: 5, health: 8 },
{ date: '2024-06-03', grocery: 1, fashion: 0, health: 5 },
{ date: '2024-06-04', grocery: 5, fashion: 1, health: 9 },
{ date: '2024-06-05', grocery: 10, fashion: 11, health: 5 },
{ date: '2024-06-06', grocery: 1, fashion: 1, health: 0 },
{ date: '2024-06-07', grocery: 4, fashion: 2, health: 0 },

{ date: '2024-07-01', grocery: 1, fashion: 1, health: 1 },
{ date: '2024-07-02', grocery: 5, fashion: 3, health: 0 },
{ date: '2024-07-03', grocery: 10, fashion: 4, health: 1 },
{ date: '2024-07-04', grocery: 5, fashion: 4, health: 1 },
{ date: '2024-07-05', grocery: 7, fashion: 5, health: 3 },
{ date: '2024-07-06', grocery: 1, fashion: 5, health: 4 },
{ date: '2024-07-07', grocery: 1, fashion: 10, health: 4 },

{ date: '2024-08-01', grocery: 1, fashion: 10, health: 5 },
{ date: '2024-08-02', grocery: 15, fashion: 5, health: 1 },
{ date: '2024-08-03', grocery: 2, fashion: 10, health: 5 },
{ date: '2024-08-04', grocery: 2, fashion: 5, health: 1},
{ date: '2024-08-05', grocery: 20, fashion: 1, health: 1 },
{ date: '2024-08-06', grocery: 2, fashion: 1, health: 1 },
{ date: '2024-08-07', grocery: 2, fashion: 2, health: 8 },

{ date: '2024-09-01', grocery: 2, fashion: 20, health: 15 },
{ date: '2024-09-02', grocery: 3, fashion: 2, health: 3 },
{ date: '2024-09-03', grocery: 2, fashion: 2, health: 5 },
{ date: '2024-09-04', grocery: 5, fashion: 2, health: 2 },
{ date: '2024-09-05', grocery: 2, fashion: 2, health: 2 },
{ date: '2024-09-06', grocery: 2, fashion: 3, health: 2 },
{ date: '2024-09-07', grocery: 0, fashion: 4, health: 5 },

// { date: '2024-10-01', grocery: 270, fashion: 250, health: 235 },
// { date: '2024-10-02', grocery: 275, fashion: 255, health: 240 },
// { date: '2024-10-03', grocery: 280, fashion: 260, health: 245 },
// { date: '2024-10-04', grocery: 285, fashion: 265, health: 250 },
// { date: '2024-10-05', grocery: 290, fashion: 270, health: 255 },
// { date: '2024-10-06', grocery: 295, fashion: 275, health: 260 },
// { date: '2024-10-07', grocery: 300, fashion: 280, health: 265 },

// { date: '2024-11-01', grocery: 310, fashion: 290, health: 275 },
// { date: '2024-11-02', grocery: 315, fashion: 295, health: 280 },
// { date: '2024-11-03', grocery: 320, fashion: 300, health: 285 },
// { date: '2024-11-04', grocery: 325, fashion: 305, health: 290 },
// { date: '2024-11-05', grocery: 330, fashion: 310, health: 295 },
// { date: '2024-11-06', grocery: 335, fashion: 315, health: 300 },
// { date: '2024-11-07', grocery: 340, fashion: 320, health: 305 },
]

const buyerFeeData = [
    // Original Data (January - April)
    { date: '2024-01-01', totalOrders: 10, avgOrderValue: 100, totalSales: 500, buyerFinderFees: 10},
    { date: '2024-01-02', totalOrders: 20, avgOrderValue: 200, totalSales: 200, buyerFinderFees: 20},
    { date: '2024-01-03', totalOrders: 30, avgOrderValue: 300, totalSales: 300, buyerFinderFees: 15},
    { date: '2024-01-04', totalOrders: 40, avgOrderValue: 500, totalSales: 100, buyerFinderFees: 10},
    { date: '2024-01-05', totalOrders: 50, avgOrderValue: 100, totalSales: 100, buyerFinderFees: 10},
    { date: '2024-01-06', totalOrders: 50, avgOrderValue: 150, totalSales: 200, buyerFinderFees: 10},
    { date: '2024-01-07', totalOrders: 40, avgOrderValue: 300, totalSales: 400, buyerFinderFees: 10},
    { date: '2024-02-01', totalOrders: 30, avgOrderValue: 400, totalSales: 300, buyerFinderFees: 10},
    { date: '2024-02-02', totalOrders: 10, avgOrderValue: 300, totalSales: 200, buyerFinderFees: 10},
    { date: '2024-02-03', totalOrders: 20, avgOrderValue: 180, totalSales: 100, buyerFinderFees: 10},
    { date: '2024-02-04', totalOrders: 40, avgOrderValue: 150, totalSales: 100, buyerFinderFees: 10},
    { date: '2024-02-05', totalOrders: 70, avgOrderValue: 200, totalSales: 200, buyerFinderFees: 10},
    { date: '2024-02-06', totalOrders: 20, avgOrderValue: 100, totalSales: 200, buyerFinderFees: 10},
    { date: '2024-02-07', totalOrders: 10, avgOrderValue: 150, totalSales: 300, buyerFinderFees: 10},
    { date: '2024-03-01', totalOrders: 30, avgOrderValue: 100, totalSales: 400, buyerFinderFees: 10},
  ];
    const generatedBuyerFeeData = [
        { date: '2024-05-01', totalOrders: 50, avgOrderValue: 200, totalSales: 50, buyerFinderFees: 20 },
        { date: '2024-05-02', totalOrders: 55, avgOrderValue: 210, totalSales: 100, buyerFinderFees: 22 },
        { date: '2024-05-03', totalOrders: 60, avgOrderValue: 220, totalSales: 150, buyerFinderFees: 24 },
        { date: '2024-05-04', totalOrders: 65, avgOrderValue: 230, totalSales: 200, buyerFinderFees: 26 },
        { date: '2024-05-05', totalOrders: 70, avgOrderValue: 240, totalSales: 250, buyerFinderFees: 28 },
        { date: '2024-05-06', totalOrders: 75, avgOrderValue: 250, totalSales: 300, buyerFinderFees: 30 },
        { date: '2024-05-07', totalOrders: 80, avgOrderValue: 260, totalSales: 350, buyerFinderFees: 32 },

        { date: '2024-06-01', totalOrders: 85, avgOrderValue: 270, totalSales: 400, buyerFinderFees: 34 },
        { date: '2024-06-02', totalOrders: 90, avgOrderValue: 280, totalSales: 450, buyerFinderFees: 36 },
        { date: '2024-06-03', totalOrders: 95, avgOrderValue: 290, totalSales: 500, buyerFinderFees: 38 },
        { date: '2024-06-04', totalOrders: 100, avgOrderValue: 300, totalSales: 450, buyerFinderFees: 40 },
        { date: '2024-06-05', totalOrders: 105, avgOrderValue: 310, totalSales: 500, buyerFinderFees: 42 },
        { date: '2024-06-06', totalOrders: 110, avgOrderValue: 320, totalSales: 550, buyerFinderFees: 44 },
        { date: '2024-06-07', totalOrders: 115, avgOrderValue: 330, totalSales: 400, buyerFinderFees: 46 },

        { date: '2024-07-01', totalOrders: 120, avgOrderValue: 340, totalSales: 350, buyerFinderFees: 48 },
        { date: '2024-07-02', totalOrders: 125, avgOrderValue: 350, totalSales: 500, buyerFinderFees: 50 },
        { date: '2024-07-03', totalOrders: 130, avgOrderValue: 360, totalSales: 600, buyerFinderFees: 52 },
        { date: '2024-07-04', totalOrders: 135, avgOrderValue: 370, totalSales: 350, buyerFinderFees: 54 },
        { date: '2024-07-05', totalOrders: 140, avgOrderValue: 380, totalSales: 400, buyerFinderFees: 56 },
        { date: '2024-07-06', totalOrders: 145, avgOrderValue: 390, totalSales: 380, buyerFinderFees: 58 },
        { date: '2024-07-07', totalOrders: 150, avgOrderValue: 400, totalSales: 390, buyerFinderFees: 60 },

        { date: '2024-08-01', totalOrders: 155, avgOrderValue: 410, totalSales: 500, buyerFinderFees: 62 },
        { date: '2024-08-02', totalOrders: 160, avgOrderValue: 420, totalSales: 350, buyerFinderFees: 64 },
        { date: '2024-08-03', totalOrders: 165, avgOrderValue: 430, totalSales: 400, buyerFinderFees: 66 },
        { date: '2024-08-04', totalOrders: 170, avgOrderValue: 440, totalSales: 450, buyerFinderFees: 68 },
        { date: '2024-08-05', totalOrders: 175, avgOrderValue: 450, totalSales: 480, buyerFinderFees: 70 },
        { date: '2024-08-06', totalOrders: 180, avgOrderValue: 460, totalSales: 500, buyerFinderFees: 72 },
        { date: '2024-08-07', totalOrders: 185, avgOrderValue: 470, totalSales: 450, buyerFinderFees: 74 },

        { date: '2024-09-01', totalOrders: 190, avgOrderValue: 480, totalSales: 550, buyerFinderFees: 76 },
        { date: '2024-09-02', totalOrders: 195, avgOrderValue: 490, totalSales: 500, buyerFinderFees: 78 },
        { date: '2024-09-03', totalOrders: 200, avgOrderValue: 500, totalSales: 550, buyerFinderFees: 80 },
        { date: '2024-09-04', totalOrders: 205, avgOrderValue: 510, totalSales: 600, buyerFinderFees: 82 },
        { date: '2024-09-05', totalOrders: 210, avgOrderValue: 520, totalSales: 500, buyerFinderFees: 84 },
        { date: '2024-09-06', totalOrders: 215, avgOrderValue: 530, totalSales: 550, buyerFinderFees: 86 },
        { date: '2024-09-07', totalOrders: 220, avgOrderValue: 540, totalSales: 650, buyerFinderFees: 88 },

        { date: '2024-10-01', totalOrders: 225, avgOrderValue: 550, totalSales: 550, buyerFinderFees: 90 },
        { date: '2024-10-02', totalOrders: 230, avgOrderValue: 560, totalSales: 480, buyerFinderFees: 92 },
        { date: '2024-10-03', totalOrders: 235, avgOrderValue: 570, totalSales: 490, buyerFinderFees: 94 },
        { date: '2024-10-04', totalOrders: 240, avgOrderValue: 580, totalSales: 495, buyerFinderFees: 96 },
        { date: '2024-10-05', totalOrders: 245, avgOrderValue: 590, totalSales: 550, buyerFinderFees: 98 },
        { date: '2024-10-06', totalOrders: 250, avgOrderValue: 600, totalSales: 550, buyerFinderFees: 100 },
        { date: '2024-10-07', totalOrders: 255, avgOrderValue: 610, totalSales: 560, buyerFinderFees: 102 },

        { date: '2024-11-01', totalOrders: 260, avgOrderValue: 620, totalSales: 550, buyerFinderFees: 104 },
        { date: '2024-11-02', totalOrders: 265, avgOrderValue: 630, totalSales: 600, buyerFinderFees: 106 },
        { date: '2024-11-03', totalOrders: 270, avgOrderValue: 640, totalSales: 650, buyerFinderFees: 108 },
        { date: '2024-11-04', totalOrders: 275, avgOrderValue: 650, totalSales: 700, buyerFinderFees: 110 },
        { date: '2024-11-05', totalOrders: 280, avgOrderValue: 660, totalSales: 750, buyerFinderFees: 112 },
        { date: '2024-11-06', totalOrders: 285, avgOrderValue: 670, totalSales: 800, buyerFinderFees: 114 },
        { date: '2024-11-07', totalOrders: 290, avgOrderValue: 680, totalSales: 700, buyerFinderFees: 116 },
    ];

    const transactionalData2024 = [
        // Today and Yesterday
        { date: '2024-01-01', totalOrders: 100, totalOrderValue: 10000 },
        { date: '2023-12-31', totalOrders: 50, totalOrderValue: 5000 },
      
        // First five days of each month
        { date: '2024-01-01', totalOrders: 110, totalOrderValue: 11000 },
        { date: '2024-01-02', totalOrders: 120, totalOrderValue: 12000 },
        { date: '2024-01-03', totalOrders: 130, totalOrderValue: 13000 },
        { date: '2024-01-04', totalOrders: 140, totalOrderValue: 14000 },
        { date: '2024-01-05', totalOrders: 150, totalOrderValue: 15000 },
        { date: '2024-02-01', totalOrders: 160, totalOrderValue: 16000 },
        { date: '2024-02-02', totalOrders: 170, totalOrderValue: 17000 },
        { date: '2024-02-03', totalOrders: 180, totalOrderValue: 18000 },
        { date: '2024-02-04', totalOrders: 190, totalOrderValue: 19000 },
        { date: '2024-02-05', totalOrders: 200, totalOrderValue: 20000 },
        { date: '2024-03-01', totalOrders: 210, totalOrderValue: 21000 },
        { date: '2024-03-02', totalOrders: 220, totalOrderValue: 22000 },
        { date: '2024-03-03', totalOrders: 230, totalOrderValue: 23000 },
        { date: '2024-03-04', totalOrders: 240, totalOrderValue: 24000 },
        { date: '2024-03-05', totalOrders: 250, totalOrderValue: 25000 },
        { date: '2024-04-01', totalOrders: 260, totalOrderValue: 26000 },
        { date: '2024-04-02', totalOrders: 270, totalOrderValue: 27000 },
        { date: '2024-04-03', totalOrders: 280, totalOrderValue: 28000 },
        { date: '2024-04-04', totalOrders: 290, totalOrderValue: 29000 },
        { date: '2024-04-05', totalOrders: 300, totalOrderValue: 30000 },
        { date: '2024-05-01', totalOrders: 310, totalOrderValue: 31000 },
        { date: '2024-05-02', totalOrders: 320, totalOrderValue: 32000 },
        { date: '2024-05-03', totalOrders: 330, totalOrderValue: 33000 },
        { date: '2024-05-04', totalOrders: 340, totalOrderValue: 34000 },
        { date: '2024-05-05', totalOrders: 350, totalOrderValue: 35000 },
        { date: '2024-06-01', totalOrders: 360, totalOrderValue: 36000 },
        { date: '2024-06-02', totalOrders: 370, totalOrderValue: 37000 },
        { date: '2024-06-03', totalOrders: 380, totalOrderValue: 38000 },
        { date: '2024-06-04', totalOrders: 390, totalOrderValue: 39000 },
        { date: '2024-06-05', totalOrders: 400, totalOrderValue: 40000 },
        { date: '2024-07-01', totalOrders: 410, totalOrderValue: 41000 },
        { date: '2024-07-02', totalOrders: 420, totalOrderValue: 42000 },
        { date: '2024-07-03', totalOrders: 430, totalOrderValue: 43000 },
        { date: '2024-07-04', totalOrders: 440, totalOrderValue: 44000 },
        { date: '2024-07-05', totalOrders: 450, totalOrderValue: 45000 },
        { date: '2024-08-01', totalOrders: 460, totalOrderValue: 46000 },
        { date: '2024-08-02', totalOrders: 470, totalOrderValue: 47000 },
        { date: '2024-08-03', totalOrders: 480, totalOrderValue: 48000 },
        { date: '2024-08-04', totalOrders: 490, totalOrderValue: 49000 },
        { date: '2024-08-05', totalOrders: 500, totalOrderValue: 50000 },
        { date: '2024-09-01', totalOrders: 510, totalOrderValue: 51000 },
        { date: '2024-09-02', totalOrders: 520, totalOrderValue: 52000 },
        { date: '2024-09-03', totalOrders: 530, totalOrderValue: 53000 },
        { date: '2024-09-04', totalOrders: 540, totalOrderValue: 54000 },
        { date: '2024-09-05', totalOrders: 550, totalOrderValue: 55000 },
        { date: '2024-10-01', totalOrders: 560, totalOrderValue: 56000 },
        { date: '2024-10-02', totalOrders: 570, totalOrderValue: 57000 },
        { date: '2024-10-03', totalOrders: 580, totalOrderValue: 58000 },
        { date: '2024-10-04', totalOrders: 590, totalOrderValue: 59000 },
        { date: '2024-10-05', totalOrders: 600, totalOrderValue: 60000 },
        { date: '2024-11-01', totalOrders: 610, totalOrderValue: 61000 },
        { date: '2024-11-02', totalOrders: 620, totalOrderValue: 62000 },
        { date: '2024-11-03', totalOrders: 630, totalOrderValue: 63000 },
        { date: '2024-11-04', totalOrders: 640, totalOrderValue: 64000 },
        { date: '2024-11-05', totalOrders: 650, totalOrderValue: 65000 },
        { date: '2024-12-01', totalOrders: 660, totalOrderValue: 66000 },
        { date: '2024-12-02', totalOrders: 670, totalOrderValue: 67000 },
        { date: '2024-12-03', totalOrders: 680, totalOrderValue: 68000 },
        { date: '2024-12-04', totalOrders: 690, totalOrderValue: 69000 },
        { date: '2024-12-05', totalOrders: 700, totalOrderValue: 70000 },
      
        // Last five days of each month
        { date: '2024-01-31', totalOrders: 710, totalOrderValue: 71000 },
        { date: '2024-01-30', totalOrders: 720, totalOrderValue: 72000 },
        { date: '2024-01-29', totalOrders: 730, totalOrderValue: 73000 },
        { date: '2024-01-28', totalOrders: 740, totalOrderValue: 74000 },
        { date: '2024-01-27', totalOrders: 750, totalOrderValue: 75000 },
        { date: '2024-02-29', totalOrders: 760, totalOrderValue: 76000 },
        { date: '2024-02-28', totalOrders: 770, totalOrderValue: 77000 },
        { date: '2024-02-27', totalOrders: 780, totalOrderValue: 78000 },
        { date: '2024-02-26', totalOrders: 790, totalOrderValue: 79000 },
        { date: '2024-02-25', totalOrders: 800, totalOrderValue: 80000 },
        { date: '2024-03-31', totalOrders: 810, totalOrderValue: 81000 },
        { date: '2024-03-30', totalOrders: 820, totalOrderValue: 82000 },
        { date: '2024-03-29', totalOrders: 830, totalOrderValue: 83000 },
        { date: '2024-03-28', totalOrders: 840, totalOrderValue: 84000 },
        { date: '2024-03-27', totalOrders: 850, totalOrderValue: 85000 },
        { date: '2024-04-30', totalOrders: 860, totalOrderValue: 86000 },
        { date: '2024-04-29', totalOrders: 870, totalOrderValue: 87000 },
        { date: '2024-04-28', totalOrders: 880, totalOrderValue: 88000 },
        { date: '2024-04-27', totalOrders: 890, totalOrderValue: 89000 },
        { date: '2024-04-26', totalOrders: 900, totalOrderValue: 90000 },
        { date: '2024-05-31', totalOrders: 910, totalOrderValue: 91000 },
        { date: '2024-05-30', totalOrders: 920, totalOrderValue: 92000 },
        { date: '2024-05-29', totalOrders: 930, totalOrderValue: 93000 },
        { date: '2024-05-28', totalOrders: 940, totalOrderValue: 94000 },
        { date: '2024-05-27', totalOrders: 950, totalOrderValue: 95000 },
        { date: '2024-06-30', totalOrders: 960, totalOrderValue: 96000 },
        { date: '2024-06-29', totalOrders: 970, totalOrderValue: 97000 },
        { date: '2024-06-28', totalOrders: 980, totalOrderValue: 98000 },
        { date: '2024-06-27', totalOrders: 990, totalOrderValue: 99000 },
        { date: '2024-06-26', totalOrders: 1000, totalOrderValue: 100000 },
        { date: '2024-07-31', totalOrders: 1010, totalOrderValue: 101000 },
        { date: '2024-07-30', totalOrders: 1020, totalOrderValue: 102000 },
        { date: '2024-07-29', totalOrders: 1030, totalOrderValue: 103000 },
        { date: '2024-07-28', totalOrders: 1040, totalOrderValue: 104000 },
        { date: '2024-07-27', totalOrders: 1050, totalOrderValue: 105000 },
        { date: '2024-08-31', totalOrders: 1060, totalOrderValue: 106000 },
        { date: '2024-08-30', totalOrders: 1070, totalOrderValue: 107000 },
        { date: '2024-08-29', totalOrders: 1080, totalOrderValue: 108000 },
        { date: '2024-08-28', totalOrders: 1090, totalOrderValue: 109000 },
        { date: '2024-08-27', totalOrders: 1100, totalOrderValue: 110000 },
        { date: '2024-09-30', totalOrders: 1110, totalOrderValue: 111000 },
        { date: '2024-09-29', totalOrders: 1120, totalOrderValue: 112000 },
        { date: '2024-09-28', totalOrders: 1130, totalOrderValue: 113000 },
        { date: '2024-09-27', totalOrders: 1140, totalOrderValue: 114000 },
        { date: '2024-09-26', totalOrders: 1150, totalOrderValue: 115000 },
        { date: '2024-10-31', totalOrders: 1160, totalOrderValue: 116000 },
        { date: '2024-10-30', totalOrders: 1170, totalOrderValue: 117000 },
        { date: '2024-10-29', totalOrders: 1180, totalOrderValue: 118000 },
        { date: '2024-10-28', totalOrders: 1190, totalOrderValue: 119000 },
        { date: '2024-10-27', totalOrders: 1200, totalOrderValue: 120000 },
        { date: '2024-11-30', totalOrders: 1210, totalOrderValue: 121000 },
        { date: '2024-11-29', totalOrders: 1220, totalOrderValue: 122000 },
        { date: '2024-11-28', totalOrders: 1230, totalOrderValue: 123000 },
        { date: '2024-11-27', totalOrders: 1240, totalOrderValue: 124000 },
        { date: '2024-11-26', totalOrders: 1250, totalOrderValue: 125000 },
        { date: '2024-12-31', totalOrders: 1260, totalOrderValue: 126000 },
        { date: '2024-12-30', totalOrders: 1270, totalOrderValue: 127000 },
        { date: '2024-12-29', totalOrders: 1280, totalOrderValue: 128000 },
        { date: '2024-12-28', totalOrders: 1290, totalOrderValue: 129000 },
        { date: '2024-12-27', totalOrders: 1300, totalOrderValue: 130000 },
      ];

      const cartAbondonedData = [
        { category: "Grocery", added_to_cart: 16, payment_completed: 6, drop_off: 4, checked_out: 6 },
        { category: "Electronics", added_to_cart: 15, payment_completed: 6, drop_off: 6, checked_out: 3 },
        { category: "Fashion", added_to_cart: 16, payment_completed: 8, drop_off: 6, checked_out: 2 },
      ];
      
    return (
        <>
        <div className="container-fluid">
            <div className="row">
                <div className="col-12 mt-3">
                        <div className="card shadow bg-white table-padding mb-2 px-1 py-2">
                            <div className="row">

                                <div className="col-12">
                                    <OrderStatusChart data={ordersData} type={OrderStatusChartType}/>
                                </div>
                            </div>
                        </div>
                        <div className="card shadow bg-white table-padding mb-2 px-1 py-2">
                            <div className="row">
                                <div className="col-12">
                                    <ProductSyncChart data={productSyncData} type={ProductsSyncChartType}/>
                                </div>
                            </div>
                        </div>
                        <div className="card shadow bg-white table-padding mb-2 px-1 py-2">
                            <div className="row">

                                <div className="col-12">
                                    <BuyerFeeChart data={generatedBuyerFeeData} type={BuyerFeeChartType}/>
                                </div>
                            </div>
                        </div>
                        {/* <div className="card shadow bg-white table-padding mb-2 px-1 py-2">
                            <div className="row">

                                <div className="col-12">
                                    <TransactionalAnalysis data={transactionalData2024} type={TxnAnalysisChartType}/>
                                </div>
                            </div>
                        </div> */}

                        <div className="card shadow bg-white table-padding mb-2 px-1 py-2">
                            <div className="row">
                                <div className="col-12">
                                    <CancellationAnalysis data={cancellationAnalysisData} type={CancellationAnalysisChartType}/>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12 mt-4">
                                <h5>Cart Abandoned Rate</h5>
                            </div>
                        </div>

                        <div className="row justify-content-center mt-1">
                                {cartAbondonedData.map((categoryData, index) => (
                                    <div key={categoryData.category} className="col-6">
                                    <div className="card shadow bg-white table-padding mb-2 px-1 py-2">
                                        <CartAbandonedRate key={index} categoryData={categoryData} />
                                    </div>
                                    </div>
                                ))}
                        </div>
                </div>
            </div>
        </div>
        </>
    ) 

}

export default Dashboard;
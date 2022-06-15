<?php
defined('BASEPATH') or exit('No direct script access allowed');

// -------------- routing ------------------------

$route['dashboard'] = 'Dashboard/dashboard';
$route['Profile'] = 'Profile/Profile';
$route['pelanggan'] = 'Pelanggan/pelanggan';
$route['details/(:any)'] = 'Pelanggan/pelanggan/details/$1';
$route['panel-odp'] = 'Panel_Odp/Panel';
$route['geografis'] = 'Geografis/Maps';
$route['laporan-kerusakan'] = 'Laporan-Kerusakan/LaporanKerusakan';
$route['kariawan'] = 'Management-Kariawan/Kariawan';

// -----------------------------------------------

// 
$route['profile-edit'] = 'Profile/Profile/edit';
$route['profile-edit-proses'] = "Profile/Profile/editProses";
// 



// ////////////////////// API //////////////////////
$route['getDesa/(:any)'] = 'Backend/Ajax/ReqestDesaById/$1';
// /////////////////////////////////////////////////


// /////////// Api save data pelanggan ////////////
$route['SavePelanggan'] = 'Backend/Pelanggan/SavePelanggan';
$route['getPelangganById/(:any)'] = 'Backend/Pelanggan/getPelangganById/$1';
$route['deletePel/(:any)'] = 'Backend/Pelanggan/deletes/$1';
// ///////////////////////////////////////////////

// ////////// Api data Odp ///////////////////////
$route['SavePanelOdp'] = 'Backend/PanelOdp/SavePanelOdp';
$route['allMarker'] = 'Backend/PanelOdp/allMarker';
$route['getEdits/(:any)'] = 'Backend/PanelOdp/getEdits/$1';
$route['deletePanel/(:any)'] = 'Backend/PanelOdp/deletes/$1';
// //////////////////////////////////////////////

// ///////// raport ////////////////////////////
$route['report-save'] = "Backend/Problem/reportSave";
$route['hndelProblem'] = "Backend/Problem/hndelProblem";
$route['problemBatal/(:any)'] = "Backend/Problem/problemBatal/$1";
// ////////////////////////////////////////////

// ////////// kariawan ///////////////////////
$route['insert-kariawan'] = "Backend/Kariawan/hndel_push";
$route['getUserById/(:any)'] = "Backend/Kariawan/getDataById/$1";
// //////////////////////////////////////////

// //////// ///////////////////////
$route['laporan-pelanggan/(:any?)'] = "Laporan/Laporan/laporanPelanggan/$1";
$route['laporan-odp/(:any?)'] = "Laporan/Laporan/laporanOdp/$1";
$route['laporan-kerusakan-rep/(:any?)'] = "Laporan/Laporan/laporanKerusakan/$1";
// ///////////////////////////////////////

// //////// ///////////////////////
$route['print-laporan-pelanggan/(:any)'] = "Laporan/Laporan/printlaporanPelanggan/$1";
$route['print-laporan-odp/(:any)'] = "Laporan/Laporan/printlaporanOdp/$1";
$route['print-laporan-kerusakan-rep/(:any)'] = "Laporan/Laporan/printlaporanKerusakan/$1";
// ///////////////////////////////////////

// //////// login //////////////////
$route['login'] = "Auth/Login";
// ////////////////////////////////



$route['default_controller'] = 'welcome';
$route['404_override'] = '';
$route['translate_uri_dashes'] = FALSE;

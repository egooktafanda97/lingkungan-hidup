<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'

], function ($router) {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::get('/user-get', [AuthController::class, 'userGet']);
    Route::get('/userByAuth/{mounth}', [AuthController::class, 'userByAuth']);
    Route::get('/userByAuthHome', [AuthController::class, 'userByAuthHome']);
    Route::delete('/delete/{id}', [AuthController::class, 'deleted']);
    Route::get('/authCheck', [AuthController::class, 'authCheck']);
    Route::get('/getUserById/{id}', [AuthController::class, 'getUserById']);
    Route::post('/updateUser', [AuthController::class, 'updateUser']);
    // stor saldo
    Route::post('/storSaldo', [\App\Http\Controllers\HistorySaldoController::class, 'UpSaldo']);
    Route::get('/getRiwayatSaldo/{id_user?}', [\App\Http\Controllers\HistorySaldoController::class, 'getRiwayatSaldo']);
    Route::get('/getRiwayatSaldoByAuth', [\App\Http\Controllers\HistorySaldoController::class, 'getRiwayatSaldoByAuth']);
});



// Zona ==================================================================================
Route::group([
    'middleware' => 'api',
    'prefix' => 'zona'

], function ($router) {
    Route::post('/create', [\App\Http\Controllers\ZonaController::class, 'action']);
    Route::delete('/delete/{slug}', [\App\Http\Controllers\ZonaController::class, 'delete']);
    Route::get('/get/{type}/{param?}', [\App\Http\Controllers\ZonaController::class, 'get']);
});
// ----------------------------------------------------------------------------------------

// jenis usaha ==================================================================================
Route::group([
    'middleware' => 'api',
    'prefix' => 'jenis_usaha'

], function ($router) {
    Route::post('/create', [\App\Http\Controllers\JenisUsahaController::class, 'action']);
    Route::delete('/delete/{slug}', [\App\Http\Controllers\JenisUsahaController::class, 'delete']);
    Route::get('/get/{type}/{slug?}', [\App\Http\Controllers\JenisUsahaController::class, 'get']);
});
// ----------------------------------------------------------------------------------------

// usaha ==================================================================================
Route::group([
    'middleware' => 'api',
    'prefix' => 'usaha'

], function ($router) {
    Route::post('/create', [\App\Http\Controllers\UsahaController::class, 'action']);
    Route::post('/register_qr', [\App\Http\Controllers\UsahaController::class, 'registerQrCode']);
    Route::delete('/delete/{slug}', [\App\Http\Controllers\UsahaController::class, 'delete']);
    Route::get('/get/{type}/{slug?}', [\App\Http\Controllers\UsahaController::class, 'get']);
    Route::get('/getData/{type?}', [\App\Http\Controllers\UsahaController::class, 'getData']);
    Route::get('/getByQr/{codeQr}/{tahun?}', [\App\Http\Controllers\UsahaController::class, 'getByQrCode']);
    Route::get('/checkByQr/{codeQr}', [\App\Http\Controllers\UsahaController::class, 'checkByQr']);
    Route::get('/getByIdUsaha/{id}', [\App\Http\Controllers\UsahaController::class, 'getByIdUsaha']);
    Route::get('/getByKodeUsaha/{kode}', [\App\Http\Controllers\UsahaController::class, 'getByKodeUsaha']);
    Route::post('/actionPerusahaan', [\App\Http\Controllers\UsahaController::class, 'actionPerusahaan']);
    Route::post('/setMap', [\App\Http\Controllers\UsahaController::class, 'setMap']);
});
// ----------------------------------------------------------------------------------------

// retribusi ==================================================================================
Route::group([
    'middleware' => 'api',
    'prefix' => 'retribusi'

], function ($router) {
    Route::post('/create', [\App\Http\Controllers\PengutipanController::class, 'action']);
    Route::get('/delete/{slug}', [\App\Http\Controllers\PengutipanController::class, 'delete']);
    Route::get('/get/{type}', [\App\Http\Controllers\PengutipanController::class, 'getData']);
    Route::get('/getDataRetribusi/{search?}', [\App\Http\Controllers\PengutipanController::class, 'getDataRetribusi']);
    // getBarChartCount
    Route::get('/getBarChartCount/{id}/{tahun?}', [\App\Http\Controllers\PengutipanController::class, 'getBarChartCount']);
    Route::get('/getInfoRetriTable/{id}/{tahun?}', [\App\Http\Controllers\PengutipanController::class, 'getInfoRetriTable']);
    Route::get('/getLaporanTahunan/{tahun}', [\App\Http\Controllers\PengutipanController::class, 'getLaporanTahunan']);
    Route::get('/getRetribusiByIdUsaha/{id_usaha}/{tahun?}', [\App\Http\Controllers\PengutipanController::class, 'getRetribusiByIdUsaha']);
});
// ----------------------------------------------------------------------------------------

// asyncronus ==================================================================================
Route::group([
    'middleware' => 'api',
    'prefix' => 'async'

], function ($router) {
    Route::post('/syncron', [\App\Http\Controllers\SyncronusController::class, 'syncronCreate']);
});
// ---------------------------------------------------------------------------------------------

// Npwrd ==================================================================================
Route::group([
    'middleware' => 'api',
    'prefix' => 'npwrd'

], function ($router) {
    Route::get('/getDataNpwrd', [\App\Http\Controllers\NpwrdController::class, 'getDataNpwrd']);
    Route::post('/create', [\App\Http\Controllers\NpwrdController::class, 'create']);
    Route::get('/retribusiNpwrd', [\App\Http\Controllers\NpwrdController::class, 'retribusiNpwrd']);
    Route::delete('/delete/{id}', [\App\Http\Controllers\NpwrdController::class, 'delete']);
    Route::get('/getDataPerusahaanById/{id}', [\App\Http\Controllers\NpwrdController::class, 'getDataPerusahaanById']);
    Route::get('/getDataRetribusiById/{npwrd}', [\App\Http\Controllers\NpwrdController::class, 'getDataRetribusiById']);
});
// ---------------------------------------------------------------------------------------------

// Dashboard ==================================================================================
Route::group([
    'middleware' => 'api',
    'prefix' => 'dashboard'

], function ($router) {
    Route::get('/getLineChartCount/{tahun?}', [\App\Http\Controllers\PengutipanController::class, 'getLineChartCount']);
    Route::get('/getLaporanTahunan/{tahun?}', [\App\Http\Controllers\PengutipanController::class, 'getLaporanTahunan']);
    Route::get('/counting', [\App\Http\Controllers\DashboardController::class, 'counting']);
});
// ---------------------------------------------------------------------------------------------

// Truck ==================================================================================
Route::group([
    'middleware' => 'api',
    'prefix' => 'timbangan'

], function ($router) {
    Route::get('/scales', [\App\Http\Controllers\TimbanganController::class, 'timbangan']);
    Route::get('/truck', [\App\Http\Controllers\TimbanganController::class, 'truck']);
    Route::get('/sender', [\App\Http\Controllers\TimbanganController::class, 'sender']);
});
// ---------------------------------------------------------------------------------------------


// Imports ==================================================================================
Route::group([
    'middleware' => 'api',
    'prefix' => 'import'

], function ($router) {
    Route::post('/ExcelImport', [\App\Http\Controllers\ImportController::class, 'imports']);
});
// ----------------------------------------------------------------------------------------

// Testing dump ==================================================================================
Route::group([
    'middleware' => 'api',
    'prefix' => 'test'

], function ($router) {
    Route::get('/usahaCreatedJson', [\App\Http\Controllers\Test\DumpController::class, 'UsahaCreated']);
    Route::get('/retrubusiCreatedJson', [\App\Http\Controllers\Test\DumpController::class, 'Retribusi']);
    Route::get('/test-count', [\App\Http\Controllers\Test\QueryBuildTestContoller::class, 'testCountMonth']);
});
// ----------------------------------------------------------------------------------------
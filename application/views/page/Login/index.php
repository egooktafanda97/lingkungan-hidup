<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, shrink-to-fit=no" name="viewport">
    <title>Login Admin Page Retribusi Pelalawan</title>

    <link rel="stylesheet" href="<?= base_url('assets/template/') ?>dist/modules/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="<?= base_url('assets/template/') ?>dist/modules/ionicons/css/ionicons.min.css">
    <link rel="stylesheet" href="<?= base_url('assets/template/') ?>dist/modules/fontawesome/web-fonts-with-css/css/fontawesome-all.min.css">

    <link rel="stylesheet" href="<?= base_url('assets/template/') ?>dist/css/demo.css">
    <link rel="stylesheet" href="<?= base_url('assets/template/') ?>dist/css/style.css">
    <link rel="icon" href="<?= base_url("assets/img/logo/logo.ico") ?>" type="image/x-icon" />
    <script>
        localStorage.setItem("web_url", `<?= base_url() ?>`);
        localStorage.setItem("base_url", "<?= base_url("rest/") ?>");
    </script>
</head>

<body>
    <div id="components"></div>
    <script type="module" src="<?= base_url('assets/node_app/dist/Login.bundle.js') ?>"></script>
    <script src="<?= base_url('assets/template/') ?>dist/modules/jquery.min.js"></script>
    <script src="<?= base_url('assets/template/') ?>dist/modules/popper.js"></script>
    <script src="<?= base_url('assets/template/') ?>dist/modules/tooltip.js"></script>
    <script src="<?= base_url('assets/template/') ?>dist/modules/bootstrap/js/bootstrap.min.js"></script>
    <script src="<?= base_url('assets/template/') ?>dist/modules/nicescroll/jquery.nicescroll.min.js"></script>
    <script src="<?= base_url('assets/template/') ?>dist/modules/moment.min.js"></script>
    <script src="<?= base_url('assets/template/') ?>dist/modules/scroll-up-bar/dist/scroll-up-bar.min.js"></script>
    <script src="<?= base_url('assets/template/') ?>dist/js/sa-functions.js"></script>

    <script src="<?= base_url('assets/template/') ?>dist/js/scripts.js"></script>
    <script src="<?= base_url('assets/template/') ?>dist/js/custom.js"></script>
    <script src="<?= base_url('assets/template/') ?>dist/js/demo.js"></script>

</body>

</html>
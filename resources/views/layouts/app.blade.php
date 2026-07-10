<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>NEATS ERP</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.min.css" rel="stylesheet">

    <style>

        body{
            background:#f5f7fa;
        }

        .sidebar{

            width:250px;
            height:100vh;
            background:#1E293B;
            position:fixed;
            left:0;
            top:0;
            color:white;

        }

        .sidebar a{

            color:white;
            display:block;
            padding:14px 20px;
            text-decoration:none;

        }

        .sidebar a:hover{

            background:#334155;

        }

        .content{

            margin-left:250px;
            padding:30px;

        }

        .navbar{

            background:white;
            box-shadow:0 0 10px rgba(0,0,0,.08);

        }

        .card{

            border:none;
            border-radius:15px;

        }

    </style>

</head>

<body>

<div class="sidebar">

    <h3 class="text-center mt-4">

        NEATS ERP

    </h3>

    <hr>

    <a href="#"><i class="bi bi-speedometer2"></i> Dashboard</a>

    <a href="#"><i class="bi bi-box"></i> Master Barang</a>

    <a href="#"><i class="bi bi-building"></i> Supplier</a>

    <a href="#"><i class="bi bi-people"></i> Customer</a>

    <a href="#"><i class="bi bi-gear"></i> Produksi</a>

    <a href="#"><i class="bi bi-box-arrow-in-down"></i> Gudang</a>

    <a href="#"><i class="bi bi-cart"></i> Purchasing</a>

    <a href="#"><i class="bi bi-check-circle"></i> QC</a>

    <a href="#"><i class="bi bi-file-earmark-text"></i> Laporan</a>

    <a href="#"><i class="bi bi-person"></i> User</a>

    <a href="#"><i class="bi bi-sliders"></i> Setting</a>

</div>

<div class="content">

<nav class="navbar rounded p-3 mb-4">

<div class="container-fluid">

<h4 class="mb-0">

Dashboard

</h4>

<div>

Administrator

</div>

</div>

</nav>

@yield('content')

</div>

</body>

</html>
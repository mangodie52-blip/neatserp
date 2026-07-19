<!DOCTYPE html>
<html>
<head>

    <title>Material Request - {{ $request->nomor_mr }}</title>

    <style>

        body {
            font-family: Arial, sans-serif;
            font-size: 14px;
            margin: 40px;
        }

        .header {
            text-align: center;
            margin-bottom: 30px;
        }

        .header h1 {
            margin: 0;
            font-size: 24px;
        }

        .header h2 {
            margin: 5px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }

        table, th, td {
            border: 1px solid black;
        }

        th {
            background: #eee;
        }

        th, td {
            padding: 8px;
        }

        .info {
            margin-bottom: 20px;
        }

        .signature {
            margin-top: 60px;
            display: flex;
            justify-content: space-between;
            text-align: center;
        }

    </style>

</head>


<body onload="window.print()">



<div class="header">

    <h1>NEATS ERP</h1>

    <h2>MATERIAL REQUEST</h2>

</div>



<div class="info">

    <p>
        No MR :
        <b>{{ $request->nomor_mr }}</b>
    </p>


    <p>
        Tanggal :
        {{ $request->tanggal }}
    </p>


    <p>
        Status :
        {{ $request->status }}
    </p>


    @if($request->productionOrder)

    <p>
        SPK :
        {{ $request->productionOrder->nomor_spk }}
    </p>

    @endif


</div>




<table>

<thead>

<tr>

    <th>No</th>

    <th>Kode</th>

    <th>Material</th>

    <th>Qty Request</th>

    <th>Qty Approved</th>

    <th>Satuan</th>

</tr>

</thead>


<tbody>


@foreach($request->details as $index => $detail)

<tr>

    <td>
        {{ $index + 1 }}
    </td>


    <td>
        {{ $detail->material->kode }}
    </td>


    <td>
        {{ $detail->material->nama }}
    </td>


    <td style="text-align:center">

        {{ number_format($detail->qty_request) }}

    </td>


    <td style="text-align:center">

        {{ number_format($detail->qty_approved ?? 0) }}

    </td>


    <td>

        {{ $detail->material->satuan }}

    </td>


</tr>


@endforeach


</tbody>

</table>



<div class="signature">


<div>

<br><br><br>

__________________

<br>

Dibuat Oleh

</div>



<div>

<br><br><br>

__________________

<br>

Disetujui Gudang

</div>


</div>



</body>

</html>
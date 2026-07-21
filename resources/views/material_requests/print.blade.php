<!DOCTYPE html>
<html>

<head>

    <title>Material Request - {{ $request->nomor_mr }}</title>

    <style>
        body {
            font-family: Arial, sans-serif;
            font-size: 12px;
            color: #000;
        }

        .title {
            text-align: center;
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 20px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 15px;
        }

        th,
        td {
            border: 1px solid #000;
            padding: 10px;
            text-align: center;
            /* center horizontal */
            vertical-align: middle;
            /* center vertical */
        }

        th {
            background: #1e293b;
            color: #fff;
            font-weight: bold;
        }

        .left {
            text-align: left;
        }

        .header-table td {
            border: none;
            padding: 4px 0;
            text-align: left;
        }

        .signature {
            margin-top: 50px;
            width: 100%;
        }

        .signature td {
            border: none;
            text-align: center;
            padding-top: 40px;
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


        @if ($request->productionOrder)
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


            @foreach ($request->details as $index => $detail)
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

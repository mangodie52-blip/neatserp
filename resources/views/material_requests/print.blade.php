<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <title>Print Material Request</title>

    <style>
        body {
            font-family: Arial, Helvetica, sans-serif;
            margin: 30px;
            color: #000;
        }

        .header {
            text-align: center;
            margin-bottom: 25px;
        }

        .header h1 {
            margin: 0;
            font-size: 24px;
        }

        .header p {
            margin: 4px 0;
            font-size: 14px;
        }

        .info {
            margin-bottom: 20px;
        }

        .info table {
            width: 100%;
        }

        .info td {
            padding: 4px 0;
            font-size: 14px;
        }

        table.main {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
        }

        table.main th,
        table.main td {
            border: 1px solid #000;
            padding: 10px;
            text-align: center;
            vertical-align: middle;
        }

        table.main th {
            background: #f2f2f2;
            font-weight: bold;
        }

        .material {
            text-align: center !important;
            font-weight: 600;
        }

        .footer {
            margin-top: 50px;
        }

        .signature {
            width: 100%;
            margin-top: 40px;
        }

        .signature td {
            width: 50%;
            text-align: center;
            vertical-align: top;
        }

        .space {
            height: 70px;
        }

        @media print {
            body {
                margin: 10px;
            }

            .no-print {
                display: none;
            }
        }
    </style>
</head>

<body>

    <div class="header">
        <h1>NEATS ERP</h1>
        <p><strong>Material Request (MR)</strong></p>
        <p>Smart Bag Manufacturing System</p>
    </div>

    <div class="info">
        <table>
            <tr>
                <td width="140"><strong>No MR</strong></td>
                <td>: {{ $mr->nomor_mr }}</td>
            </tr>

            <tr>
                <td><strong>No SPK</strong></td>
                <td>: {{ $mr->productionOrder->nomor_spk ?? '-' }}</td>
            </tr>

            <tr>
                <td><strong>Produk</strong></td>
                <td>: {{ $mr->productionOrder->product->nama ?? '-' }}</td>
            </tr>

            <tr>
                <td><strong>Tanggal</strong></td>
                <td>: {{ \Carbon\Carbon::parse($mr->tanggal)->format('d-m-Y') }}</td>
            </tr>
        </table>
    </div>

    <table class="main">
        <thead>
            <tr>
                <th width="5%">No</th>
                <th width="45%">Material</th>
                <th width="25%">Request</th>
                <th width="25%">Approved</th>
            </tr>
        </thead>

        <tbody>
            @foreach ($mr->details as $i => $detail)
                <tr>
                    <td>{{ $i + 1 }}</td>

                    <td class="material">
                        {{ $detail->material->nama ?? '-' }}
                    </td>

                    <td>
                        {{ rtrim(rtrim(number_format($detail->qty_request, 4, '.', ''), '0'), '.') }}
                        {{ $detail->satuan }}
                    </td>

                    <td>
                        @if ($detail->qty_approved > 0)
                            {{ rtrim(rtrim(number_format($detail->qty_approved, 4, '.', ''), '0'), '.') }}
                            {{ $detail->satuan }}
                        @else
                            -
                        @endif
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>

    <div class="footer">
        <table class="signature">
            <tr>
                <td>
                    <strong>Produksi</strong>
                    <div class="space"></div>
                    ______________________
                </td>

                <td>
                    <strong>Gudang</strong>
                    <div class="space"></div>
                    ______________________
                </td>
            </tr>
        </table>
    </div>

    <script>
        window.print();
    </script>

</body>

</html>

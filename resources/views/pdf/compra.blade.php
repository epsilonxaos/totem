<html>

<head>
    <title>PDF test</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;800&display=swap" rel="stylesheet"
        type="text/css">
    <style type="text/css">
        @import url(https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;800&display=swap);

        @font-face {
            font-family: 'Inter';
            font-style: normal;
            font-weight: normal;
            src: url(https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;800&display=swap) format('truetype');
        }

        body * {
            font-family: 'Inter'
        }

        .text-verde {
            color: #75B5B0;
            font-weight: 800;
        }

        p {
            font-size: 12px
        }

        th {
            font-family: 'Inter'
        }
    </style>
</head>

<body style="background-color: #ffffff">
    <div style="background-color: #202E56; text-align: center">
        <img src="{{ $logo }}" width="150" style="display: inline" alt="">
    </div>

    <div style="background-color: #fff; padding-left: 40px; padding-right: 40px">

        <div style="background-color: white; padding: 15px; box-shadow: 3px 6.5px 3.5px 0.5px #dddddd;">

            <h1 style="text-align: center; font-weight: 600; font-size: 14px; color: #202E56; margin: 0px">¡Muchas
                gracias por tu reservación!</h1>
            <p style="text-align: center; margin-bottom: 50px">Gracias por tu compra en <span class="text-verde">Tótem
                    Beach Club</span>. A continuación, encontrarás los detalles de tu orden:</p>


            <p style="text-align: center;"><span style="font-weight: 600">Nombre completo:</span> {{ $nombre }}
            </p>
            <p style="text-align: center;"><span style="font-weight: 600">Número de folio:</span> {{ $folio }}
            </p>
            <p style="text-align: center;"><span style="font-weight: 600">Fecha de compra:</span> {{ $fechaCompra }}
            </p>
            <p style="text-align: center;"><span style="font-weight: 600">Método de pago:</span>
                @if ($total > 0)
                    {{ $metodoPago }}
                @else
                    {{ Membresía }}
                @endif
            </p>
            <p style="text-align: center; margin-bottom: 20px"><span style="font-weight: 600">Fecha de
                    reservación:</span> {{ $fechaReservacion }}</p>

            <div class="mj-column-per-100 mj-outlook-group-fix"
                style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">

                <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                    <tbody>
                        <tr>
                            <td style="vertical-align:top;padding-top:20px;">

                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style
                                    width="100%">
                                    <tbody>

                                        <tr>
                                            <td align="left"
                                                style="font-size:0px;padding:10px 25px;word-break:break-word;">

                                                <table cellpadding="0" cellspacing="0" width="100%" border="0"
                                                    style="color:#000000;font-family:Inter;font-size:11px;line-height:22px;table-layout:auto;width:100%;border:none;">
                                                    <tr
                                                        style="border-bottom:2px solid #202E56;text-align:left;padding:15px 0; width: 100%;">
                                                        <td
                                                            style="font-weight: 600; color: #75B5B0; padding: 0 15px 0 0;">
                                                            Pases</td>
                                                        <td style="font-weight: 600; color: #75B5B0; padding: 0 15px;">
                                                            Cantidad</td>
                                                        <td style="font-weight: 600; color: #75B5B0; padding: 0 15px;">
                                                            Precio</td>
                                                        <td style="font-weight: 600; color: #75B5B0; padding: 0 15px;">
                                                            Subtotal</td>
                                                    </tr>
                                                    <tr>
                                                        <td style="padding: 0 15px 0 0;">Adultos</td>
                                                        <td style="padding: 0 15px;">
                                                            {{ $adultos }}{{ $payAdultos > 0 ? ' (+ ' . $payAdultos . ' extras)' : '' }}
                                                        </td>
                                                        <td style="padding: 0 0 0 15px;">${{ $precioAdultos }} MXN</td>
                                                        @if ($isSocio)
                                                            <td style="padding: 0 0 0 15px;">
                                                                ${{ $payAdultos > 0 ? $payAdultos * $precioAdultos : 0 }}
                                                                MXN</td>
                                                        @else
                                                            <td style="padding: 0 0 0 15px;">
                                                                ${{ $adultos * $precioAdultos }} MXN</td>
                                                        @endif
                                                    </tr>
                                                    <tr>
                                                        <td style="padding: 0 15px 0 0;">Menores +6</td>
                                                        <td style="padding: 0 15px;">
                                                            {{ $ninos }}{{ $payNinos > 0 ? ' (+ ' . $payNinos . ' extras)' : '' }}
                                                        </td>
                                                        <td style="padding: 0 0 0 15px;">${{ $precioNinos }} MXN</td>
                                                        @if ($isSocio)
                                                            <td style="padding: 0 0 0 15px;">
                                                                ${{ $payNinos > 0 ? $payNinos * $precioAdultos : 0 }}
                                                                MXN</td>
                                                        @else
                                                            <td style="padding: 0 0 0 15px;">
                                                                ${{ $ninos * $precioAdultos }} MXN</td>
                                                        @endif
                                                    </tr>
                                                    <tr>
                                                        <td style="padding: 0 15px 20px 0;">Infantes</td>
                                                        <td style="padding: 0 15px 20px ;">{{ $ninosMenores }}</td>
                                                        <td style="padding: 0 0 20px 15px;">${{ $precioNinosMenores }}
                                                            MXN</td>
                                                        <td style="padding: 0 0 20px 15px;">$0 MXN</td>
                                                    </tr>
                                                    <tr
                                                        style="border-bottom:2px solid #202E56; border-top:2px solid #202E56;text-align:left;padding:15px 0; width: 100%">
                                                        <td style="padding: 0 15px 0 0;">Total</td>
                                                        <td style="padding: 0 15px;"></td>
                                                        <td style="padding: 0 15px;"></td>
                                                        @if ($isSocio)
                                                            <td style="padding: 0 15px;">
                                                                {{ $total > 0 ? '$' . $total . ' MXN' : 'MEMBRESÍA CLUB' }}
                                                            </td>
                                                        @else
                                                            <td style="padding: 0 15px;">${{ $total }} MXN</td>
                                                        @endif
                                                    </tr>
                                                </table>

                                            </td>
                                        </tr>

                                    </tbody>
                                </table>

                            </td>
                        </tr>
                    </tbody>
                </table>

            </div>

            <h3 style="text-align: center; font-weight: 600; font-size: 14px; color: #202E56; margin-top: 40px">En caso
                de
                cancelación o cambio de reserva:</h3>
            <p style="text-align: center; margin-bottom: 20px">Consectetur adipiscing elit. Nullam pellentesque
                efficitur lorem sit amet aliquam. Suspendisse pharetra sapien at
                pretium fringilla. Vestibulum ultrices nisl sit amet mauris tempus, ac tempor ipsum vehicula.</p>

        </div>
    </div>

    <p style="margin: 0px; text-align: center; margin-top: 40px">clubdeplayatotem.com</p>
    <p style="margin: 0px; text-align: center">gerencia@clubdeplayatotem.com</p>
    <p style="margin: 0px; text-align: center">(999) 326 4940</p>
</body>

</html>

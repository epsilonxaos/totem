<?php

namespace App\Http\Controllers;

use App\Models\Daypass;
use App\Models\Movimientos;
use App\Models\Orden;
use App\Models\Reservacion;
use App\Models\Socios;
use Illuminate\Http\Request;

class ReservacionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return view('panel.reservacion.index', [
            "title" => "Reservaciones",
            "breadcrumb" => [
                [
                    'title' => 'Ordenes',
                    'active' => true,
                ]
            ],
            'data' => Reservacion::orderBy('created_at', 'desc')->paginate(10)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('panel.reservacion.create', [
            "title" => "Nueva reservación",
            "breadcrumb" => [
                [
                    'title' => 'Reservaciones',
                    'route' => 'panel.reservacion.index',
                    'active' => false,
                ],
                [
                    'title' => 'Nueva reservación',
                    'active' => true
                ]
            ],
            'socios' => Socios::where('fecha_finalizacion', '>=', now())->get(),
            'daypass' => Daypass::find(1)
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Int $id)
    {
        $r = Reservacion::find($id);
        $o = Orden::where('reservacion_id', $id)->first();
        $m = Movimientos::where('orden_id', $o->id)->first();

        return view('panel.reservacion.show', [
            "title" => "Informacion de reservación",
            "breadcrumb" => [
                [
                    'title' => 'Reservaciones',
                    'route' => 'panel.reservacion.index',
                    'active' => false,
                ],
                [
                    'title' => 'Información',
                    'active' => true
                ]
            ],
            'data' => $r,
            'orden' => $o,
            'movimiento' => $m
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Int $id)
    {
        $r = Reservacion::find($id);
        $o = Orden::where('reservacion_id', $id)->first();
        $m = Movimientos::where('orden_id', $o->id)->first();

        return view('panel.reservacion.edit', [
            "title" => "Informacion de reservación",
            "breadcrumb" => [
                [
                    'title' => 'Reservaciones',
                    'route' => 'panel.reservacion.index',
                    'active' => false,
                ],
                [
                    'title' => 'Información',
                    'active' => true
                ]
            ],
            'data' => $r,
            'orden' => $o,
            'movimiento' => $m
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Int $id)
    {
        try {
            $reservacion = Reservacion::find($id);
            $reservacion->fecha_reservacion = $request->fecha_reservacion;
            $reservacion->save();

            $o = Orden::where('reservacion_id', $id)->first();

            $movi = Movimientos::where('orden_id', $o->id)->first();
            $movi->fecha_reservacion = $reservacion->fecha_reservacion;
            $movi->save();

            return route('panel.reservacion.show', ['id' => $reservacion->id]);
        } catch (\Throwable $th) {
            return response(["status" => 'error', 'error' => 'Hubo un problema en el proceso', 'er' => $th], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Reservacion $reservacion)
    {
        //
    }
}

// src/components/PlayersTable.tsx
import React, { useState } from 'react';
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Input,
    Chip,
    type ChipProps,
    Button,
    Spinner
} from "@heroui/react";
import type {PlayerStats, PlayerStatus} from '../types';

interface PlayersTableProps {
    players: PlayerStats[];
    isLoading?: boolean;
    onPlayerClick?: (player: PlayerStats) => void;
    onToggleFavorite?: (playerId: number) => void;
    favorites?: number[];
}

const PlayersTable: React.FC<PlayersTableProps> = ({
                                                       players,
                                                       isLoading = false,
                                                       onPlayerClick,
                                                       onToggleFavorite,
                                                       favorites = []
                                                   }) => {
    const [filterValue, setFilterValue] = useState("");

    const statusColorMap: Record<PlayerStatus, ChipProps["color"]> = {
        legit: "success",
        sus: "warning",
        very_sus: "warning",
        cheater: "danger",
    };

    const statusLabelMap: Record<PlayerStatus, string> = {
        legit: "Légit",
        sus: "Suspect",
        very_sus: "Très suspect",
        cheater: "Tricheur",
    };

    const columns = [
        { name: "NOM", uid: "name", sortable: true },
        { name: "K/D", uid: "kd", sortable: true },
        { name: "KPM", uid: "kpm", sortable: true },
        { name: "PRÉCISION", uid: "accuracy", sortable: true },
        { name: "RANG", uid: "rank", sortable: true },
        { name: "STATUT", uid: "status", sortable: true },
        { name: "FAVORIS", uid: "favorite" },
    ];

    const filteredItems = React.useMemo(() => {
        if (!filterValue) return players;

        return players.filter((player) =>
            player.name.toLowerCase().includes(filterValue.toLowerCase())
        );
    }, [players, filterValue]);

    const renderCell = React.useCallback((player: PlayerStats, columnKey: React.Key) => {
        const cellValue = player[columnKey as keyof PlayerStats];

        switch (columnKey) {
            case "name":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small capitalize">{player.name}</p>
                        <p className="text-bold text-tiny capitalize text-default-400">
                            #{player.id}
                        </p>
                    </div>
                );
            case "kd":
                return (
                    <span className="text-bold text-small">
            {player.kd.toFixed(2)}
          </span>
                );
            case "kpm":
                return (
                    <span className="text-bold text-small">
            {player.kpm.toFixed(2)}
          </span>
                );
            case "accuracy":
                return (
                    <span className="text-bold text-small">
            {player.accuracy}
          </span>
                );
            case "rank":
                return (
                    <span className="text-bold text-small">
            {player.rank}
          </span>
                );
            case "status":
                return (
                    <Chip
                        className="capitalize"
                        color={statusColorMap[player.status]}
                        size="sm"
                        variant="flat"
                    >
                        {statusLabelMap[player.status]}
                    </Chip>
                );
            case "favorite":
                return (
                    <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        onPress={() => onToggleFavorite?.(player.id)}
                    >
            <span className={`text-lg ${
                favorites.includes(player.id) ? 'text-warning' : 'text-default-300'
            }`}>
              ⭐
            </span>
                    </Button>
                );
            default:
                return cellValue;
        }
    }, [favorites, onToggleFavorite]);

    const onSearchChange = React.useCallback((value?: string) => {
        setFilterValue(value || "");
    }, []);

    const onClear = React.useCallback(() => {
        setFilterValue("");
    }, []);

    const topContent = React.useMemo(() => {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex justify-between gap-3 items-end">
                    <Input
                        isClearable
                        className="w-full sm:max-w-[44%]"
                        placeholder="Rechercher par nom..."
                        value={filterValue}
                        onClear={() => onClear()}
                        onValueChange={onSearchChange}
                    />
                    <div className="flex gap-3">
            <span className="text-default-400 text-small">
              Total {filteredItems.length} joueur{filteredItems.length !== 1 ? 's' : ''}
            </span>
                    </div>
                </div>
            </div>
        );
    }, [filterValue, filteredItems.length, onSearchChange]);

    return (
        <Table
            aria-label="Table des joueurs"
            topContent={topContent}
            topContentPlacement="outside"
            classNames={{
                wrapper: "max-h-[500px]",
            }}
        >
            <TableHeader columns={columns}>
                {(column) => (
                    <TableColumn
                        key={column.uid}
                        align={column.uid === "favorite" ? "center" : "start"}
                        allowsSorting={column.sortable}
                    >
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody
                emptyContent={
                    isLoading ? (
                        <div className="flex justify-center">
                            <Spinner label="Chargement des joueurs..." />
                        </div>
                    ) : (
                        "Aucun joueur trouvé"
                    )
                }
                items={filteredItems}
            >
                {(item) => (
                    <TableRow
                        key={item.id}
                        className="cursor-pointer hover:bg-default-50"
                        onClick={() => onPlayerClick?.(item)}
                    >
                        {(columnKey) => (
                            <TableCell>{renderCell(item, columnKey)}</TableCell>
                        )}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
};

export default PlayersTable;
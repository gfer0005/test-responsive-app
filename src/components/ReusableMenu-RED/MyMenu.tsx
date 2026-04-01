import type { ReactNode } from "react";
import { Menu } from "./Menu";
import { MoreHorizontal } from "lucide-react";

export interface MenuItemData {
  /** Identifiant unique optionnel, sinon l'index sera utilisé */
  id?: string | number;
  /** Texte principal du menu */
  label: string;
  /** Icône optionnelle (ex: issue de lucide-react) */
  icon?: ReactNode;
  /** Fonction appelée lors du clic sur l'élément */
  onClick?: () => void;
}

export interface MyMenuProps {
  /** Liste des boutons du menu */
  items: MenuItemData[];
  /** Icône ou contenu du déclencheur. Par défaut: <MoreHorizontal /> */
  triggerIcon?: ReactNode;
  /** Largeur du menu une fois ouvert. Par défaut: 160 */
  menuWidth?: number;
  /** Direction d'ouverture ("top", "bottom", "left", "right"). Par défaut: "top" */
  direction?: "top" | "bottom" | "left" | "right";
  /** Alignement par rapport au bouton ("start", "center", "end"). Par défaut: "start" */
  anchor?: "start" | "center" | "end";
}

export function MyMenu({
  items,
  triggerIcon = <MoreHorizontal size={20} className="text-white" />,
  menuWidth = 160,
  direction = "top",
  anchor = "start",
}: MyMenuProps) {
  return (
    <>
      <style>{`
        .portable-menu-content {
          padding: 8px;
          display: flex;
          flex-direction: column;
        }
        .portable-menu-item {
          display: flex;
          align-items: center;
          gap: 12px;
          border-radius: 8px;
          padding: 8px;
          font-size: 14px;
          color: #ffffff;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .portable-menu-item:hover,
        .portable-menu-item[data-highlighted] {
          background-color: rgba(255, 255, 255, 0.30);
        }
        .portable-menu-icon {
          flex-shrink: 0;
          color: rgba(255, 255, 255, 0.8);
          display: flex;
          align-items: center;
        }
      `}</style>

      <Menu.Root direction={direction} anchor={anchor}>
        <Menu.Container
          buttonSize={40}
          menuWidth={menuWidth}
          menuRadius={16}
          className="bg-[#c30045]/80 backdrop-blur-lg shadow-xl"
        >
          <Menu.Trigger>
            <div className="flex h-10 w-10 items-center justify-center rounded hover:bg-[#f01a69] transition-colors cursor-pointer">
              {triggerIcon}
            </div>
          </Menu.Trigger>
          <Menu.Content className="portable-menu-content">
            {items.map((item, index) => (
              <Menu.Item
                key={item.id ?? index}
                className="portable-menu-item"
                onSelect={item.onClick ? item.onClick : () => {}}
              >
                {item.icon && (
                  <span className="portable-menu-icon">{item.icon}</span>
                )}
                {item.label}
              </Menu.Item>
            ))}
          </Menu.Content>
        </Menu.Container>
      </Menu.Root>
    </>
  );
}

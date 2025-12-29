
import { supabase } from '../lib/supabase';
import { InventoryItem } from '../types';

export class InventoryService {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  async getStockLevels(): Promise<InventoryItem[]> {
    if (!supabase || !this.companyId) {
      return [
        { id: 'inv-1', companyId: 'demo', name: 'N95 Masks', category: 'PPE', stockLevel: 450, unit: 'boxes', minThreshold: 100 } as InventoryItem,
        { id: 'inv-2', companyId: 'demo', name: 'Hoyer Slings (Medium)', category: 'HARDWARE', stockLevel: 12, unit: 'units', minThreshold: 5 } as InventoryItem,
        { id: 'inv-3', companyId: 'demo', name: 'Nitrile Gloves', category: 'PPE', stockLevel: 80, unit: 'boxes', minThreshold: 150 } as InventoryItem,
      ];
    }
    const { data } = await supabase.from('inventory').select('*').eq('company_id', this.companyId);
    return (data || []).map((d: any): InventoryItem => ({
      id: String(d.id),
      companyId: String(d.company_id),
      name: String(d.name),
      category: String(d.category),
      stockLevel: Number(d.stock_level),
      unit: String(d.unit),
      minThreshold: Number(d.min_threshold)
    }));
  }

  async triggerLowStockAlert(item: InventoryItem) {
    console.log(`[SUPPLY_CHAIN_ALARM]: Low stock detected for ${item.name}. Level: ${item.stockLevel} ${item.unit}`);
  }

  async fulfillRequisition(staffId: string, itemId: string, quantity: number) {
    console.log(`[INVENTORY_CORE]: Fulfilling request for ${quantity} units of ${itemId} to Staff ${staffId}`);
  }
}

export const inventoryService = new InventoryService();

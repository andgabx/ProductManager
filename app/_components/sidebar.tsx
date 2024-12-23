const Sidebar = () => {
  return (
    <div className="w-64 bg-primary p-8">
      <div>
        <h1 className="text-2xl font-bold">LEIGOPEARLS</h1>
      </div>

      <div className="flex flex-col gap-2 p-8">
        <button className="px-6 py-3">Dashboard</button>
        <button className="px-6 py-3">Produtos</button>
        <button className="px-6 py-3">Vendas</button>
      </div>
    </div>
  );
};

export default Sidebar;
